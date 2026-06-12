import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackHeader from '../components/BackHeader'
import SegmentedCount from '../components/SegmentedCount'
import LocationAccordion from '../components/LocationAccordion'
import ProductCard from '../components/ProductCard'
import SwipeableCard from '../components/SwipeableCard'
import ScanSheet from '../components/ScanSheet'
import ScannerButton from '../components/ScannerButton'
import ScanLoaderOverlay from '../components/ScanLoaderOverlay'
import BottomCTA from '../components/BottomCTA'
import Tag from '../components/Tag'
import Toast from '../components/Toast'
import { tasks, products } from '../data/tasks'
import { useProto } from '../store/prototype'
import { useT } from '../i18n/useT'

const SCANNED_LOCATION = 'a01-213-431'
const TOAST_DURATION_MS = 10_000
const SCAN_LOADER_MS = 1400

type ScanFlow =
  | { kind: 'none' }
  | { kind: 'scan'; productId: string; phase: 'scanning' | 'result' }

export default function TaskDetailScreen() {
  const { taskId } = useParams<{ taskId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const t = useT()
  const task = taskId ? tasks[taskId] : undefined
  const initialTab = searchParams.get('tab') === 'checked' ? 'checked' : 'tocheck'
  const [tab, setTab] = useState<'tocheck' | 'checked'>(initialTab)
  const entries = useProto((s) => s.entries)
  const markNotFound = useProto((s) => s.markNotFound)
  const pendingNotification = useProto((s) => s.pendingNotification)
  const clearPendingNotification = useProto((s) => s.clearPendingNotification)

  const [scanFlow, setScanFlow] = useState<ScanFlow>({ kind: 'none' })
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [scannerLoading, setScannerLoading] = useState(false)

  useEffect(() => {
    if (pendingNotification && pendingNotification.taskId === taskId) {
      setToastMessage(pendingNotification.message)
      clearPendingNotification()
    }
  }, [pendingNotification, taskId, clearPendingNotification])

  useEffect(() => {
    if (!toastMessage) return
    const id = setTimeout(() => setToastMessage(null), TOAST_DURATION_MS)
    return () => clearTimeout(id)
  }, [toastMessage])

  if (!task) {
    return <div className="p-lg text-text-primary">—</div>
  }

  const visibleGroups = task.groups.filter((g) => {
    if (!g.unlockOnMismatchOf) return true
    const e = entries[`${task.id}:${g.unlockOnMismatchOf}`]
    return e?.status === 'mismatch'
  })
  const visibleProductIds = visibleGroups.flatMap((g) => g.productIds)
  const checkedIds = visibleProductIds.filter((pid) => {
    const e = entries[`${task.id}:${pid}`]
    if (!e) return false
    return e.status !== 'pending' || e.batches.length > 0
  })
  const toCheckIds = visibleProductIds.filter((pid) => !checkedIds.includes(pid))
  const allChecked = visibleProductIds.length > 0 && checkedIds.length === visibleProductIds.length

  const handleSwipe = (productId: string) => {
    setScanFlow({ kind: 'scan', productId, phase: 'scanning' })
  }

  const handleScanYes = () => {
    if (scanFlow.kind !== 'scan') return
    const pid = scanFlow.productId
    markNotFound(task.id, pid)
    setScanFlow({ kind: 'none' })
    navigate(`/tasks/${task.id}/products/${pid}?mode=scan-yes&loc=${encodeURIComponent(SCANNED_LOCATION)}`)
  }

  const handleScanNo = () => {
    if (scanFlow.kind !== 'scan') return
    markNotFound(task.id, scanFlow.productId)
    setScanFlow({ kind: 'none' })
  }

  const handleScannerTap = () => {
    // If the scan sheet is open in scanning phase, the FAB triggers the
    // location loader and advances the sheet to the result phase.
    if (scanFlow.kind === 'scan' && scanFlow.phase === 'scanning') {
      const flow = scanFlow
      setScannerLoading(true)
      setTimeout(() => {
        setScannerLoading(false)
        setScanFlow({ ...flow, phase: 'result' })
      }, SCAN_LOADER_MS)
      return
    }
    // Otherwise: open the next un-checked product
    const next = toCheckIds[0]
    if (!next) return
    setScannerLoading(true)
    setTimeout(() => {
      setScannerLoading(false)
      navigate(`/tasks/${task.id}/products/${next}`)
    }, SCAN_LOADER_MS)
  }

  return (
    <div className="flex flex-col h-full w-full bg-base-lowest">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <BackHeader title={`${t('task.prefix')} ${task.title}`} />
        {toastMessage && (
          <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
        )}
        <div className="px-lg pb-md">
          <SegmentedCount
            segments={[
              { key: 'tocheck', label: t('task.toCheck'), count: toCheckIds.length },
              { key: 'checked', label: t('task.checked'), count: checkedCardsCount(checkedIds, task.id, entries) },
            ]}
            activeKey={tab}
            onChange={(k) => setTab(k as 'tocheck' | 'checked')}
          />
        </div>

        <div className="flex flex-col gap-md px-lg pt-md pb-2xl">
          {tab === 'tocheck' ? (
            visibleGroups.map((g) => {
              const visible = g.productIds.filter((pid) => toCheckIds.includes(pid))
              if (visible.length === 0) return null
              return (
                <LocationAccordion
                  key={g.location}
                  location={g.location}
                  productCount={visible.length}
                >
                  {visible.map((pid) => {
                    const p = products[pid]
                    return (
                      <SwipeableCard
                        key={pid}
                        revealLabel={t('task.notFound')}
                        onAction={() => handleSwipe(pid)}
                      >
                        <ProductCard
                          imageUrl={p.imageUrl}
                          name={t(p.nameKey)}
                          expiryDateLabel={
                            task.kind === 'expiry-check' ? t('product.expiration', { date: p.expectedExpiryDate }) : ''
                          }
                          instructionChip={t(p.instructionKey, { date: p.expectedExpiryDate })}
                        />
                      </SwipeableCard>
                    )
                  })}
                </LocationAccordion>
              )
            })
          ) : (
            <>
              {checkedIds.flatMap((pid) => {
                const p = products[pid]
                const e = entries[`${task.id}:${pid}`]
                const isOutOfDate = task.kind === 'out-of-date'
                const isNotFound = e?.status === 'not-found'
                const cards: React.ReactNode[] = []

                if (isNotFound) {
                  cards.push(
                    <ProductCard
                      key={`${pid}-notfound`}
                      imageUrl={p.imageUrl}
                      name={t(p.nameKey)}
                      expiryDateLabel=""
                      instructionChip={p.location}
                      trailingTag={<Tag status="danger">{t('task.notFound')}</Tag>}
                    />,
                  )
                }

                ;(e?.batches ?? []).forEach((b, i) => {
                  cards.push(
                    <ProductCard
                      key={`${pid}-batch-${b.id ?? i}`}
                      imageUrl={p.imageUrl}
                      name={t(p.nameKey)}
                      metadata={
                        isOutOfDate
                          ? t('product.itemsRemoved', { n: b.quantity ?? 0 })
                          : t('product.items', { n: b.quantity ?? 0 })
                      }
                      expiryDateLabel={isOutOfDate ? '' : t('product.expiration', { date: b.expiryDate })}
                      instructionChip={b.location}
                    />,
                  )
                })

                if (cards.length === 0) {
                  cards.push(
                    <ProductCard
                      key={`${pid}-empty`}
                      imageUrl={p.imageUrl}
                      name={t(p.nameKey)}
                      expiryDateLabel=""
                      instructionChip={p.location}
                    />,
                  )
                }

                return cards
              })}
            </>
          )}
        </div>
      </div>

      {allChecked && tab === 'checked' && (
        <BottomCTA buttons={[{ label: t('task.finishTask'), onClick: () => navigate('/audits') }]} />
      )}

      {tab === 'tocheck' && toCheckIds.length > 0 && (
        <ScannerButton onClick={handleScannerTap} disabled={scannerLoading} />
      )}

      <ScanLoaderOverlay open={scannerLoading} label={t('scan.scanningBarcode')} />

      {scanFlow.kind === 'scan' && (
        <ScanSheet
          open
          phase={scanFlow.phase}
          scannedLocation={SCANNED_LOCATION}
          onCancel={() => setScanFlow({ kind: 'none' })}
          onYes={handleScanYes}
          onNo={handleScanNo}
          onDeleteLocation={() => setScanFlow({ kind: 'none' })}
        />
      )}
    </div>
  )
}

function checkedCardsCount(
  checkedIds: string[],
  taskId: string,
  entries: Record<string, { batches: { quantity: number | null }[]; status: string }>,
): number {
  let total = 0
  for (const pid of checkedIds) {
    const e = entries[`${taskId}:${pid}`]
    if (!e) continue
    const notFoundCount = e.status === 'not-found' ? 1 : 0
    const batchCount = e.batches.length
    total += notFoundCount + batchCount || 1
  }
  return total
}
