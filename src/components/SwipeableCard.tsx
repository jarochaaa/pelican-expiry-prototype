import { useState, useRef, type ReactNode, type PointerEvent } from 'react'

interface Props {
  children: ReactNode
  revealLabel: string
  onAction: () => void
  threshold?: number
  revealWidth?: number
}

export default function SwipeableCard({
  children,
  revealLabel,
  onAction,
  threshold = 80,
  revealWidth = 320,
}: Props) {
  const [translate, setTranslate] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef<number | null>(null)
  const baseTranslate = useRef(0)

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX
    baseTranslate.current = translate
    setAnimating(false)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return
    const delta = e.clientX - startX.current
    const next = Math.min(0, Math.max(-revealWidth, baseTranslate.current + delta))
    setTranslate(next)
  }

  const onPointerUp = () => {
    if (startX.current === null) return
    startX.current = null
    setAnimating(true)
    if (translate <= -threshold) {
      setTranslate(-revealWidth)
      // Allow snap animation, then trigger action and reset
      setTimeout(() => {
        onAction()
        setTranslate(0)
      }, 180)
    } else {
      setTranslate(0)
    }
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-feedback-danger-high flex items-center justify-end pr-lg"
        style={{ borderRadius: 'inherit' }}
      >
        <span className="text-display-sm text-text-inverse pr-md">{revealLabel}</span>
      </div>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          transform: `translateX(${translate}px)`,
          transition: animating ? 'transform 180ms ease-out' : 'none',
          touchAction: 'pan-y',
        }}
      >
        {children}
      </div>
    </div>
  )
}
