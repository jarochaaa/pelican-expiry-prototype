import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ProductHero from '../components/ProductHero'
import AlertBanner from '../components/AlertBanner'
import BatchCard from '../components/BatchCard'
import BottomCTA from '../components/BottomCTA'
import NumericBottomSheet from '../components/NumericBottomSheet'
import DatePickerSheet from '../components/DatePickerSheet'
import ScannerButton from '../components/ScannerButton'
import ScanLoaderOverlay from '../components/ScanLoaderOverlay'
import { products, tasks, type Batch } from '../data/tasks'
import { useProto } from '../store/prototype'
import { useT } from '../i18n/useT'

const EXPECTED_QTY = 10

type SheetState =
  | { kind: 'none' }
  | { kind: 'enter'; batchIdx: number }
  | { kind: 'recount'; batchIdx: number }
  | { kind: 'date-batch' }
  | { kind: 'qty-batch'; date: string }

function formatDate(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${d.getFullYear()}`
}

export default function ProductInputScreen() {
  const { taskId, productId } = useParams<{ taskId: string; productId: string }>()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const scannedLoc = searchParams.get('loc')
  const navigate = useNavigate()
  const t = useT()
  const product = productId ? products[productId] : undefined
  const task = taskId ? tasks[taskId] : undefined

  const entry = useProto((s) => (taskId && productId ? s.entries[`${taskId}:${productId}`] : undefined))
  const setBatches = useProto((s) => s.setBatches)
  const appendBatch = useProto((s) => s.appendBatch)
  const markChecked = useProto((s) => s.markChecked)
  const markMismatch = useProto((s) => s.markMismatch)
  const setPendingNotification = useProto((s) => s.setPendingNotification)

  const isScanYes = mode === 'scan-yes'

  const initialBatches: Batch[] = useMemo(() => {
    if (isScanYes) {
      return [
        {
          id: 'batch-1',
          quantity: 0,
          expiryDate: product?.expectedExpiryDate ?? '',
          location: scannedLoc ?? product?.location ?? '',
        },
      ]
    }
    if (entry?.batches.length) return entry.batches
    return [
      {
        id: 'batch-1',
        quantity: null,
        expiryDate: product?.expectedExpiryDate ?? '',
        location: product?.location ?? '',
      },
    ]
  }, [isScanYes, scannedLoc, entry, product])

  const [batches, setLocalBatches] = useState<Batch[]>(initialBatches)
  const [sheet, setSheet] = useState<SheetState>({ kind: 'none' })
  const [confirmedMismatch, setConfirmedMismatch] = useState(false)
  const [scannerLoading, setScannerLoading] = useState(false)

  if (!product || !task || !taskId || !productId) {
    return <div className="p-lg text-text-primary">—</div>
  }

  const totalQuantity = batches.reduce((sum, b) => sum + (b.quantity ?? 0), 0)
  const anyInput = batches.some((b) => b.quantity !== null && b.quantity > 0)

  const isExpiryCheck = product.flow === 'expiry-check'
  const hasMismatch = isExpiryCheck && anyInput && totalQuantity < EXPECTED_QTY
  const showMismatchUI = isScanYes || (hasMismatch && confirmedMismatch)

  const updateBatch = (idx: number, patch: Partial<Batch>) =>
    setLocalBatches((bs) => bs.map((b, i) => (i === idx ? { ...b, ...patch } : b)))

  const deleteBatch = (idx: number) =>
    setLocalBatches((bs) => (bs.length > 1 ? bs.filter((_, i) => i !== idx) : bs))

  // Compute the URL to navigate back to: include ?tab=checked when this was the
  // last pending product in the task (and the action didn't unlock new ones).
  const computeBackUrl = (opts: { unlocksNew?: boolean } = {}) => {
    const unlocksNew = !!opts.unlocksNew
    const allEntries = useProto.getState().entries
    const visibleGroupsAfter = unlocksNew
      ? task.groups
      : task.groups.filter((g) => {
          if (!g.unlockOnMismatchOf) return true
          if (g.unlockOnMismatchOf === productId) return true
          return allEntries[`${taskId}:${g.unlockOnMismatchOf}`]?.status === 'mismatch'
        })
    const visiblePidsAfter = visibleGroupsAfter.flatMap((g) => g.productIds)
    const isLast =
      !unlocksNew &&
      visiblePidsAfter.every((pid) => {
        if (pid === productId) return true
        const e = allEntries[`${taskId}:${pid}`]
        return e && (e.status !== 'pending' || e.batches.length > 0)
      })
    return `/tasks/${taskId}${isLast ? '?tab=checked' : ''}`
  }

  const handleDone = () => {
    setBatches(taskId, productId, batches)
    markChecked(taskId, productId)
    navigate(computeBackUrl())
  }

  const handleConfirmMismatch = () => {
    let unlocksNew = false
    if (!isScanYes) {
      setBatches(taskId, productId, batches)
      markMismatch(taskId, productId)
      const unlocksGroup = task.groups.find((g) => g.unlockOnMismatchOf === productId)
      if (unlocksGroup) {
        unlocksNew = true
        setPendingNotification({
          taskId,
          message: t('task.newLocationToast'),
        })
      }
    }
    navigate(computeBackUrl({ unlocksNew }))
  }

  const handleSubmit = () => {
    setBatches(taskId, productId, batches)
    markChecked(taskId, productId)
    navigate(computeBackUrl())
  }

  const backVariant = product.flow === 'missing-units' ? 'down' : 'arrow'
  const displayLocation = isScanYes && scannedLoc ? scannedLoc : product.location

  const alertText = (() => {
    if (isScanYes) return ''
    if (product.flow === 'missing-units') {
      return t(product.alertKey, { date: product.expectedExpiryDate, location: product.location })
    }
    return t(product.alertKey, { date: product.expectedExpiryDate })
  })()

  const bottomCTA = (() => {
    if (showMismatchUI) {
      return (
        <BottomCTA
          buttons={[
            { label: t('product.addBatches'), variant: 'secondary', onClick: () => setSheet({ kind: 'date-batch' }) },
            { label: t('product.confirmMismatch'), onClick: handleConfirmMismatch },
          ]}
        />
      )
    }
    if (!anyInput) {
      return (
        <BottomCTA
          buttons={[
            {
              label: t(product.ctaKey),
              onClick: () => setSheet({ kind: 'enter', batchIdx: 0 }),
            },
          ]}
        />
      )
    }
    if (product.flow === 'missing-units' || product.flow === 'remove-expired') {
      return <BottomCTA buttons={[{ label: t('common.submit'), onClick: handleSubmit }]} />
    }
    return <BottomCTA buttons={[{ label: t('common.done'), onClick: handleDone }]} />
  })()

  const alertNode = (() => {
    if (isScanYes) {
      return (
        <AlertBanner
          title={t('product.alert.addOtherTitle')}
          body={t('product.alert.addOtherBody', { location: displayLocation })}
          variant="yellow"
        />
      )
    }
    if (showMismatchUI) {
      return (
        <AlertBanner
          title={t('product.alert.mismatchTitle')}
          body={t('product.alert.mismatchBody', { location: product.location })}
          variant="yellow"
        />
      )
    }
    return <AlertBanner body={alertText} variant={product.alertVariant} />
  })()

  return (
    <div className="flex flex-col h-full w-full bg-base-lowest">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ProductHero imageUrl={product.imageUrl} imageAlt={t(product.nameKey)} backVariant={backVariant} />

        <div className="px-lg pt-lg pb-md">
          <h2
            className="text-display-md text-text-primary"
            style={{ fontVariationSettings: '"opsz" 25' }}
          >
            {t(product.nameKey)}
          </h2>
        </div>

        <div className="px-lg pb-md">{alertNode}</div>

        <div className="flex flex-col gap-md px-lg pb-2xl">
          {batches.map((batch, idx) => (
            <BatchCard
              key={batch.id}
              index={idx + 1}
              quantity={batch.quantity}
              expiryDate={batch.expiryDate}
              location={batch.location}
              hideExpiry={product.flow === 'remove-expired'}
              onQuantityChange={(n) => updateBatch(idx, { quantity: n })}
              onEditQuantity={() => setSheet({ kind: 'enter', batchIdx: idx })}
              onDelete={batches.length > 1 ? () => deleteBatch(idx) : undefined}
            />
          ))}
        </div>
      </div>

      {bottomCTA}

      <ScannerButton
        disabled={scannerLoading}
        onClick={() => {
          setScannerLoading(true)
          setTimeout(() => {
            setScannerLoading(false)
            setSheet({ kind: 'date-batch' })
          }, 1400)
        }}
      />

      <ScanLoaderOverlay open={scannerLoading} label={t('scan.scanningLocation')} />

      {sheet.kind === 'enter' && (
        <NumericBottomSheet
          open
          mode="enter"
          initialValue={batches[sheet.batchIdx]?.quantity}
          location={batches[sheet.batchIdx]?.location ?? product.location}
          expiryDate={batches[sheet.batchIdx]?.expiryDate ?? product.expectedExpiryDate}
          title={t('numpad.enter')}
          onCancel={() => setSheet({ kind: 'none' })}
          onConfirm={(n) => {
            updateBatch(sheet.batchIdx, { quantity: n })
            if (isExpiryCheck && !isScanYes && n < EXPECTED_QTY && !confirmedMismatch) {
              setSheet({ kind: 'recount', batchIdx: sheet.batchIdx })
            } else {
              setSheet({ kind: 'none' })
            }
          }}
        />
      )}

      {sheet.kind === 'recount' && (
        <NumericBottomSheet
          open
          mode="recount"
          initialValue={batches[sheet.batchIdx]?.quantity}
          location={batches[sheet.batchIdx]?.location ?? product.location}
          expiryDate={batches[sheet.batchIdx]?.expiryDate ?? product.expectedExpiryDate}
          title={t('numpad.reEnter')}
          alertBody={t('numpad.recountBody', {
            date: batches[sheet.batchIdx]?.expiryDate ?? product.expectedExpiryDate,
            location: batches[sheet.batchIdx]?.location ?? product.location,
          })}
          onCancel={() => setSheet({ kind: 'none' })}
          onConfirm={(n) => {
            updateBatch(sheet.batchIdx, { quantity: n })
            setConfirmedMismatch(true)
            setSheet({ kind: 'none' })
          }}
        />
      )}

      {sheet.kind === 'date-batch' && (
        <DatePickerSheet
          open
          onCancel={() => setSheet({ kind: 'none' })}
          onApply={(d) => setSheet({ kind: 'qty-batch', date: formatDate(d) })}
        />
      )}

      {sheet.kind === 'qty-batch' && (
        <NumericBottomSheet
          open
          mode="enter"
          initialValue={0}
          location={displayLocation}
          expiryDate={sheet.date}
          title={t('numpad.enter')}
          onCancel={() => setSheet({ kind: 'date-batch' })}
          onConfirm={(n) => {
            const newBatch: Batch = {
              id: `batch-${Date.now()}`,
              quantity: n,
              expiryDate: sheet.date,
              location: displayLocation,
            }
            setLocalBatches((bs) => [...bs, newBatch])
            appendBatch(taskId, productId, newBatch)
            setSheet({ kind: 'none' })
          }}
        />
      )}
    </div>
  )
}
