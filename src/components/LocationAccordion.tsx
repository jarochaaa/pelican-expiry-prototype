import { useState, type ReactNode } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useT } from '../i18n/useT'

interface Props {
  location: string
  productCount: number
  children: ReactNode
  defaultOpen?: boolean
}

export default function LocationAccordion({ location, productCount, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const t = useT()
  const countLabel =
    productCount === 1
      ? t('task.productSingular', { n: productCount })
      : t('task.productPlural', { n: productCount })
  return (
    <div className="w-full bg-base-flat border border-border-normal rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-lg py-md flex items-center justify-between text-left"
      >
        <div className="flex flex-col">
          <span className="text-display-sm text-text-primary">{t('task.goTo', { location })}</span>
          <span className="text-body-sm text-text-tertiary">{countLabel}</span>
        </div>
        {open ? (
          <ChevronUp size={20} strokeWidth={1.75} className="text-text-primary" />
        ) : (
          <ChevronDown size={20} strokeWidth={1.75} className="text-text-primary" />
        )}
      </button>
      {open && <div className="px-md pb-md flex flex-col gap-md">{children}</div>}
    </div>
  )
}
