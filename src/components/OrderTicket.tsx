import { MapPin } from 'lucide-react'
import Tag from './Tag'

interface Props {
  orderId: string
  timestamp: string
  location?: string
  onClick?: () => void
}

export default function OrderTicket({ orderId, timestamp, location, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-base-flat border border-border-normal rounded-xl p-lg flex flex-col gap-xs text-left active:bg-base-lowest transition-colors"
    >
      <div className="flex items-center gap-sm w-full">
        <span
          className="flex-1 text-display-md text-text-primary"
          style={{ fontVariationSettings: '"opsz" 25' }}
        >
          {orderId}
        </span>
        <span className="text-subtitle-sm text-text-primary whitespace-nowrap">{timestamp}</span>
      </div>
      {location && (
        <div className="flex">
          <Tag startIcon={MapPin} status="branded" size="small">
            {location}
          </Tag>
        </div>
      )}
    </button>
  )
}
