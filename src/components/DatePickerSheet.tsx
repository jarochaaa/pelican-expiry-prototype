import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Pencil, ChevronDown } from 'lucide-react'
import { useT } from '../i18n/useT'

interface Props {
  open: boolean
  initialDate?: Date
  onApply: (date: Date) => void
  onCancel: () => void
}

function getMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startWeekday = first.getDay()
  const daysInMonth = last.getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function DatePickerSheet({ open, initialDate, onApply, onCancel }: Props) {
  const t = useT()
  const [selected, setSelected] = useState<Date>(initialDate ?? new Date(2023, 7, 17))
  const [view, setView] = useState({ year: selected.getFullYear(), month: selected.getMonth() })

  useEffect(() => {
    if (open) {
      const start = initialDate ?? new Date(2023, 7, 17)
      setSelected(start)
      setView({ year: start.getFullYear(), month: start.getMonth() })
    }
  }, [open, initialDate])

  if (!open) return null

  const cells = getMonthMatrix(view.year, view.month)

  const prev = () => {
    const m = view.month - 1
    if (m < 0) setView({ year: view.year - 1, month: 11 })
    else setView({ year: view.year, month: m })
  }
  const next = () => {
    const m = view.month + 1
    if (m > 11) setView({ year: view.year + 1, month: 0 })
    else setView({ year: view.year, month: m })
  }

  const isSelected = (d: number) =>
    d === selected.getDate() &&
    view.month === selected.getMonth() &&
    view.year === selected.getFullYear()

  const formatHero = (d: Date) =>
    `${t(`date.weekday.short.${d.getDay()}`)}, ${t(`date.month.short.${d.getMonth()}`)} ${d.getDate()}`

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-md"
      onClick={onCancel}
      style={{ width: '100%', height: '100%' }}
    >
      <div
        className="w-full max-w-[380px] bg-base-flat rounded-xl px-lg pt-lg pb-md flex flex-col gap-md"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-subtitle-md text-text-primary">{t('date.question')}</p>
        <div className="flex items-center justify-between">
          <h2
            className="text-display-lg text-text-primary"
            style={{ fontSize: '28px', fontWeight: 700, fontVariationSettings: '"opsz" 32' }}
          >
            {formatHero(selected)}
          </h2>
          <button type="button" className="text-text-primary" aria-label={t('common.edit')}>
            <Pencil size={20} strokeWidth={1.75} />
          </button>
        </div>
        <div className="h-px bg-border-normal" />

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-1 text-text-primary text-body-md"
          >
            {t(`date.month.${view.month}`)} {view.year}
            <ChevronDown size={16} strokeWidth={1.75} />
          </button>
          <div className="flex gap-sm">
            <button type="button" onClick={prev} className="text-text-primary" aria-label="‹">
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button type="button" onClick={next} className="text-text-primary" aria-label="›">
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="text-subtitle-sm text-text-primary py-1">
              {t(`date.dayInitial.${i}`)}
            </span>
          ))}
          {cells.map((c, i) => {
            if (c === null) return <span key={i} />
            const sel = isSelected(c)
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(new Date(view.year, view.month, c))}
                className={`h-9 rounded-full flex items-center justify-center text-body-md tabular-nums ${
                  sel ? 'bg-base-highest text-text-inverse font-semibold' : 'text-text-primary'
                }`}
              >
                {c}
              </button>
            )
          })}
        </div>

        <div className="flex justify-end pt-sm">
          <button
            type="button"
            onClick={() => onApply(selected)}
            className="h-10 px-lg rounded-pill bg-base-highest text-text-inverse text-display-sm"
          >
            {t('common.apply')}
          </button>
        </div>
      </div>
    </div>
  )
}
