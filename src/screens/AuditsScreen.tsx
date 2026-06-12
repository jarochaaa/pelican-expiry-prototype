import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircle2, HelpCircle, Calendar, AlertOctagon } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import IconButton from '../components/IconButton'
import Tabs from '../components/Tabs'
import SegmentedControl from '../components/SegmentedControl'
import OrderTicket from '../components/OrderTicket'
import ScreenLayout from '../components/ScreenLayout'
import Tag from '../components/Tag'
import { useT } from '../i18n/useT'

export default function AuditsScreen() {
  const t = useT()
  const [tab, setTab] = useState<'count' | 'expiry'>('count')
  const [segment, setSegment] = useState<'cycle' | 'full'>('full')
  const navigate = useNavigate()

  return (
    <ScreenLayout bottomNavKey="audits">
      <PageHeader
        title={t('audits.title')}
        rightActions={
          <>
            <IconButton icon={UserCircle2} label={t('audits.profileAria')} onClick={() => navigate('/language')} />
            <IconButton icon={HelpCircle} label={t('audits.helpAria')} />
          </>
        }
      />

      <div className="flex flex-col gap-lg px-lg">
        <Tabs
          tabs={[
            { key: 'count', label: t('audits.tab.count') },
            { key: 'expiry', label: t('audits.tab.expiry') },
          ]}
          activeKey={tab}
          onChange={(k) => setTab(k as 'count' | 'expiry')}
        />
        {tab === 'count' && (
          <SegmentedControl
            segments={[
              { key: 'cycle', label: t('audits.seg.cycle') },
              { key: 'full', label: t('audits.seg.full') },
            ]}
            activeKey={segment}
            onChange={(k) => setSegment(k as 'cycle' | 'full')}
          />
        )}
      </div>

      {tab === 'count' ? <CountList /> : <ExpiryList onOpenTask={(id) => navigate(`/tasks/${id}`)} />}
    </ScreenLayout>
  )
}

function CountList() {
  const t = useT()
  return (
    <div className="flex flex-col gap-sm px-lg pt-lg pb-lg">
      <h2 className="text-subtitle-md text-text-primary">{t('audits.inProgress')}</h2>
      <OrderTicket orderId="67890" timestamp="25/09/2024 – 13:07" location="001-39-00C" />
      <h2 className="text-subtitle-md text-text-primary mt-sm">{t('audits.toDo')}</h2>
      <OrderTicket orderId="67890" timestamp="25/09/2024 – 13:07" location="001-39-00C" />
      <OrderTicket orderId="67890" timestamp="25/09/2024 – 13:07" location="001-39-00C" />
    </div>
  )
}

function ExpiryList({ onOpenTask }: { onOpenTask: (id: string) => void }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-sm px-lg pt-lg pb-lg">
      <h2 className="text-subtitle-md text-text-primary">{t('audits.inProgress')}</h2>
      <ExpiryTicket
        orderId="67890"
        timestamp="25/09/2024 – 13:07"
        tag={<Tag startIcon={Calendar} status="branded">{t('audits.tag.expiryChecks')}</Tag>}
        right={t('audits.productsCount', { n: 20 })}
        onClick={() => onOpenTask('67890-expiry')}
      />
      <h2 className="text-subtitle-md text-text-primary mt-sm">{t('audits.toDo')}</h2>
      <ExpiryTicket
        orderId="67890"
        timestamp="25/09/2024 – 13:07"
        tag={<Tag startIcon={AlertOctagon} status="branded">{t('audits.tag.outOfDate')}</Tag>}
        onClick={() => onOpenTask('67890-outofdate')}
      />
      <ExpiryTicket
        orderId="67890"
        subId="67890"
        timestamp="25/09/2024 – 13:07"
        tag={<Tag startIcon={Calendar} status="branded">{t('audits.tag.expiryChecks')}</Tag>}
        onClick={() => onOpenTask('67890-expiry')}
      />
    </div>
  )
}

function ExpiryTicket({
  orderId,
  subId,
  timestamp,
  tag,
  right,
  onClick,
}: {
  orderId: string
  subId?: string
  timestamp: string
  tag: React.ReactNode
  right?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-base-flat border border-border-normal rounded-xl p-lg flex flex-col gap-xs text-left active:bg-base-lowest transition-colors"
    >
      <div className="flex items-center gap-sm w-full">
        <span className="text-display-md text-text-primary" style={{ fontVariationSettings: '"opsz" 25' }}>
          {orderId}
        </span>
        {subId && <span className="text-text-tertiary">·</span>}
        {subId && <span className="text-body-lg text-text-tertiary">{subId}</span>}
        <span className="flex-1" />
        <span className="text-subtitle-sm text-text-primary whitespace-nowrap">{timestamp}</span>
      </div>
      <div className="flex items-center gap-sm w-full">
        <div className="flex-1">{tag}</div>
        {right && <span className="text-body-md text-text-primary">{right}</span>}
      </div>
    </button>
  )
}
