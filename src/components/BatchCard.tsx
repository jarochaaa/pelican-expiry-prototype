import type { ReactNode } from 'react'
import { Trash2, Calendar, MapPin } from 'lucide-react'
import FieldRow from './FieldRow'
import QuantityStepper from './QuantityStepper'
import { useT } from '../i18n/useT'

interface Props {
  index: number
  quantity: number | null
  expiryDate?: string
  location: string
  hideExpiry?: boolean
  onQuantityChange: (n: number) => void
  onEditQuantity?: () => void
  onDelete?: () => void
  extra?: ReactNode
}

export default function BatchCard({
  index,
  quantity,
  expiryDate,
  location,
  hideExpiry = false,
  onQuantityChange,
  onEditQuantity,
  onDelete,
  extra,
}: Props) {
  const t = useT()
  return (
    <div className="bg-base-flat border border-border-normal rounded-xl p-lg w-full flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <h3 className="text-display-sm text-text-primary">{t('product.batch')} {index}</h3>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label={t('common.edit')}
            className="text-text-primary"
          >
            <Trash2 size={20} strokeWidth={1.75} />
          </button>
        )}
      </div>
      <div className="h-px bg-border-normal" />
      {quantity === null ? (
        <FieldRow label={t('product.quantity')} value="0" />
      ) : (
        <QuantityStepper value={quantity} onChange={onQuantityChange} onEdit={onEditQuantity} />
      )}
      {!hideExpiry && (
        <FieldRow label={t('product.expiryDate')} value={expiryDate ?? '—'} icon={Calendar} editable={quantity !== null} />
      )}
      <FieldRow label={t('product.location')} value={location} icon={MapPin} />
      {extra}
    </div>
  )
}
