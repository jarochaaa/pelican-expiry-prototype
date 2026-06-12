import type { ReactNode } from 'react'

interface ButtonSpec {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

interface Props {
  buttons: ButtonSpec[]
  children?: ReactNode
}

export default function BottomCTA({ buttons, children }: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-base-lowest pt-md pb-lg px-lg z-20 border-t border-border-normal/50">
      {children}
      <div className="flex gap-md">
        {buttons.map((b, i) => {
          const primary = (b.variant ?? 'primary') === 'primary'
          return (
            <button
              key={i}
              type="button"
              onClick={b.onClick}
              disabled={b.disabled}
              className={`flex-1 h-12 rounded-pill text-display-sm transition-colors disabled:opacity-40 ${
                primary
                  ? 'bg-base-highest text-text-inverse active:bg-base-high'
                  : 'bg-base-flat text-text-primary border border-border-high active:bg-base-lowest'
              }`}
            >
              {b.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
