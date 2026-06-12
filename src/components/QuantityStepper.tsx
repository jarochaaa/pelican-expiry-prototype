import { Minus, Plus, Pencil } from 'lucide-react'
import { useT } from '../i18n/useT'

interface Props {
  value: number
  onChange: (next: number) => void
  onEdit?: () => void
}

export default function QuantityStepper({ value, onChange, onEdit }: Props) {
  const t = useT()
  return (
    <div className="flex items-center gap-sm w-full">
      <span className="text-subtitle-md text-text-primary w-[100px] shrink-0">{t('product.quantity')}</span>
      <div className="flex-1 h-10 rounded-pill border border-border-normal bg-base-flat flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="size-9 flex items-center justify-center text-text-primary"
          aria-label="−"
        >
          <Minus size={18} strokeWidth={2} />
        </button>
        <span className="text-body-lg text-text-primary tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="size-9 flex items-center justify-center text-text-primary"
          aria-label="+"
        >
          <Plus size={18} strokeWidth={2} />
        </button>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 text-text-secondary text-body-md"
      >
        <Pencil size={14} strokeWidth={1.75} />
        <span className="underline underline-offset-2">{t('common.edit')}</span>
      </button>
    </div>
  )
}
