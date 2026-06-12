import type { ReactNode } from 'react'

interface Props {
  title: string
  leftAction?: ReactNode
  rightActions?: ReactNode
}

export default function PageHeader({ title, leftAction, rightActions }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-base-lowest w-full">
      <div className="flex flex-col gap-sm p-lg">
        <div className="flex gap-lg items-center w-full">
          <div className="flex-1 h-10 flex items-center pr-lg">{leftAction}</div>
          {rightActions && <div className="flex gap-lg items-center">{rightActions}</div>}
        </div>
        <h1
          className="text-display-xl text-text-primary"
          style={{ fontVariationSettings: '"opsz" 32' }}
        >
          {title}
        </h1>
      </div>
    </header>
  )
}
