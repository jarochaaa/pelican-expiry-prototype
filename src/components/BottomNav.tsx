import { ShoppingBag, ClipboardCheck, Truck, MoreHorizontal } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { useT } from '../i18n/useT'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

interface NavItem {
  key: string
  i18nKey: string
  icon: IconComponent
}

const items: NavItem[] = [
  { key: 'orders', i18nKey: 'nav.orders', icon: ShoppingBag },
  { key: 'audits', i18nKey: 'nav.audits', icon: ClipboardCheck },
  { key: 'receiving', i18nKey: 'nav.receiving', icon: Truck },
  { key: 'more', i18nKey: 'nav.more', icon: MoreHorizontal },
]

interface Props {
  activeKey: string
  onNavigate?: (key: string) => void
}

export default function BottomNav({ activeKey, onNavigate }: Props) {
  const t = useT()
  return (
    <nav className="bg-base-flat border-t border-border-normal w-full">
      <div className="flex px-sm">
        {items.map((item) => {
          const active = item.key === activeKey
          const Icon = item.icon
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate?.(item.key)}
              className="relative flex-1 flex flex-col items-center gap-xs pt-md pb-lg"
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 rounded-sm bg-text-primary" />
              )}
              <Icon
                size={24}
                strokeWidth={active ? 2.25 : 1.5}
                className={active ? 'text-text-primary' : 'text-text-tertiary'}
              />
              <span
                className={`text-caption ${active ? 'text-text-primary' : 'text-text-tertiary'}`}
              >
                {t(item.i18nKey)}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
