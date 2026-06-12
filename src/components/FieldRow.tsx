import type { ComponentType, SVGProps, ReactNode } from 'react'
import { Pencil } from 'lucide-react'
import { useT } from '../i18n/useT'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

interface Props {
  label: string
  value: ReactNode
  icon?: IconComponent
  onEdit?: () => void
  editable?: boolean
}

export default function FieldRow({ label, value, icon: Icon, onEdit, editable }: Props) {
  const t = useT()
  return (
    <div className="flex items-center gap-sm w-full">
      <span className="text-subtitle-md text-text-primary w-[100px] shrink-0">{label}</span>
      <div className="flex-1 h-10 px-md rounded-pill border border-border-normal bg-base-flat flex items-center gap-sm text-text-tertiary">
        {Icon && <Icon size={18} strokeWidth={1.75} />}
        <span className="text-body-md">{value}</span>
      </div>
      {editable && (
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-text-tertiary text-body-md"
        >
          <Pencil size={14} strokeWidth={1.75} />
          <span className="underline underline-offset-2">{t('common.edit')}</span>
        </button>
      )}
    </div>
  )
}
