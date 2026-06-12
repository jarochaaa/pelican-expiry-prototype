import type { ComponentType, SVGProps } from 'react'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

interface Props {
  icon: IconComponent
  onClick?: () => void
  label?: string
}

export default function IconButton({ icon: Icon, onClick, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="size-10 rounded-full bg-base-flat border border-border-normal flex items-center justify-center text-text-primary active:bg-base-lowest transition-colors"
    >
      <Icon size={20} strokeWidth={1.5} />
    </button>
  )
}
