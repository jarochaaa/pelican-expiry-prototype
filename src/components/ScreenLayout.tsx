import type { ReactNode } from 'react'
import BottomNav from './BottomNav'

interface Props {
  children: ReactNode
  bottomNavKey?: string
  hideBottomNav?: boolean
  onNavigate?: (key: string) => void
}

export default function ScreenLayout({
  children,
  bottomNavKey = 'audits',
  hideBottomNav = false,
  onNavigate,
}: Props) {
  return (
    <div className="flex flex-col h-full w-full bg-base-lowest">
      <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
      {!hideBottomNav && <BottomNav activeKey={bottomNavKey} onNavigate={onNavigate} />}
    </div>
  )
}
