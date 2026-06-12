import type { ComponentType, SVGProps, ReactNode } from 'react'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

type Status = 'branded' | 'neutral' | 'warning' | 'danger' | 'success'
type Size = 'small' | 'medium'

interface Props {
  children: ReactNode
  startIcon?: IconComponent
  status?: Status
  size?: Size
}

const statusClasses: Record<Status, string> = {
  branded: 'bg-[#0a3a4a] text-[#a3e1f0]',
  neutral: 'bg-base-lowest text-text-secondary',
  warning: 'bg-[#3a2f00] text-feedback-warning-high',
  danger: 'bg-feedback-danger-low text-feedback-danger-accent-low',
  success: 'bg-[#0f2e1a] text-[#7fd99c]',
}

const sizeClasses: Record<Size, string> = {
  small: 'h-6 px-2 text-body-sm gap-1',
  medium: 'h-8 px-3 text-body-md gap-1.5',
}

export default function Tag({ children, startIcon: Icon, status = 'neutral', size = 'small' }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-lg font-medium ${statusClasses[status]} ${sizeClasses[size]}`}
    >
      {Icon && <Icon size={size === 'small' ? 12 : 14} strokeWidth={2} />}
      {children}
    </span>
  )
}
