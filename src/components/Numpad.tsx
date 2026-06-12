import { useState, useEffect } from 'react'
import { Delete } from 'lucide-react'

interface Props {
  open: boolean
  initialValue?: number | null
  label?: string
  onConfirm: (value: number) => void
  onCancel: () => void
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'] as const

export default function Numpad({ open, initialValue, label = 'Quantity', onConfirm, onCancel }: Props) {
  const [value, setValue] = useState<string>(initialValue?.toString() ?? '')

  useEffect(() => {
    if (open) setValue(initialValue?.toString() ?? '')
  }, [open, initialValue])

  if (!open) return null

  const handleKey = (k: string) => {
    if (k === 'del') {
      setValue((v) => v.slice(0, -1))
    } else if (k === ',') {
      // ignore — quantity is integer
    } else {
      setValue((v) => (v === '0' ? k : v + k))
    }
  }

  const numeric = parseInt(value || '0', 10)

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-end z-50"
      onClick={onCancel}
      style={{ width: '100%', height: '100%' }}
    >
      <div
        className="w-full bg-base-low rounded-t-xl px-lg pt-lg pb-lg max-w-[412px] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-between mb-lg">
          <span className="text-subtitle-lg text-text-primary">{label}</span>
          <span className="text-display-xl text-text-primary tabular-nums" style={{ fontVariationSettings: '"opsz" 32' }}>
            {value || '0'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-sm">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleKey(k)}
              className="h-14 rounded-lg bg-base-flat text-text-primary text-display-md flex items-center justify-center active:bg-base-lowest"
            >
              {k === 'del' ? <Delete size={22} strokeWidth={1.75} /> : k}
            </button>
          ))}
        </div>
        <div className="flex gap-md mt-lg">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-12 rounded-pill bg-base-flat text-text-primary border border-border-high text-display-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(numeric)}
            className="flex-1 h-12 rounded-pill bg-base-highest text-text-inverse text-display-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
