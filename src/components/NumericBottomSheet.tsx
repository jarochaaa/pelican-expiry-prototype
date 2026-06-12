import { useState, useEffect } from 'react'
import { Delete, Send } from 'lucide-react'
import AlertBanner from './AlertBanner'
import { useT } from '../i18n/useT'

type Mode = 'enter' | 'recount'

interface Props {
  open: boolean
  mode?: Mode
  initialValue?: number | null
  location: string
  expiryDate: string
  title: string
  alertTitle?: string
  alertBody?: string
  onConfirm: (value: number) => void
  onCancel: () => void
}

const keys = ['1', '2', '3', '−', '4', '5', '6', 'space', '7', '8', '9', 'del', ',', '0', '.', 'send'] as const

export default function NumericBottomSheet({
  open,
  mode = 'enter',
  initialValue,
  location,
  expiryDate,
  title,
  alertTitle,
  alertBody,
  onConfirm,
  onCancel,
}: Props) {
  const t = useT()
  const [value, setValue] = useState<string>(initialValue?.toString() ?? '')

  useEffect(() => {
    if (open) setValue(initialValue?.toString() ?? '')
  }, [open, initialValue])

  if (!open) return null

  const handleKey = (k: string) => {
    if (k === 'del') setValue((v) => v.slice(0, -1))
    else if (k === 'send') {
      const n = parseInt(value || '0', 10)
      onConfirm(n)
    } else if (k === ',' || k === '.' || k === 'space' || k === '−') {
      // ignored — integer-only entry for this prototype
    } else {
      setValue((v) => (v === '0' ? k : v + k))
    }
  }

  const handleDone = () => onConfirm(parseInt(value || '0', 10))

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end z-50"
      onClick={onCancel}
      style={{ width: '100%', height: '100%' }}
    >
      <div
        className="w-full max-w-[412px] mx-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark sheet (content) */}
        <div className="bg-base-low rounded-t-xl px-lg pt-lg pb-lg flex flex-col gap-md">
          <div className="flex items-center justify-between text-text-primary text-subtitle-sm">
            <span>{location}</span>
            <span>{t('numpad.expDate', { date: expiryDate })}</span>
          </div>

          {mode === 'recount' && alertBody && (
            <AlertBanner title={alertTitle} body={alertBody} variant="yellow" />
          )}

          <h3 className="text-display-md text-text-primary text-center pt-sm">{title}</h3>

          <p
            className="text-text-primary text-center tabular-nums"
            style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.1, fontVariationSettings: '"opsz" 32' }}
          >
            {value || '0'}
          </p>

          <button
            type="button"
            onClick={handleDone}
            className="w-full h-12 rounded-lg bg-base-highest text-text-inverse text-display-sm"
          >
            {t('common.done')}
          </button>
        </div>

        {/* Keypad (iOS-ish) */}
        <div className="bg-[#d5d6dc] px-2 pt-3 pb-6">
          <div className="grid grid-cols-4 gap-1.5">
            {keys.map((k) => {
              const isNumeric = /^[0-9,.]$/.test(k)
              const isUtil = k === '−' || k === 'space'
              const isDel = k === 'del'
              const isSend = k === 'send'
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleKey(k)}
                  className={`h-11 rounded-md flex items-center justify-center text-[20px] font-medium text-text-inverse shadow-sm ${
                    isNumeric ? 'bg-white' : ''
                  } ${isUtil ? 'bg-[#a8a9ac]' : ''} ${isDel ? 'bg-[#f4b7ab]' : ''} ${
                    isSend ? 'bg-[#c4b3ff]' : ''
                  }`}
                >
                  {k === 'space' ? <span className="block w-4 h-0.5 bg-text-inverse/70 rounded" /> : null}
                  {k === 'del' ? <Delete size={18} strokeWidth={1.75} /> : null}
                  {k === 'send' ? <Send size={18} strokeWidth={1.75} /> : null}
                  {!['space', 'del', 'send'].includes(k) ? k : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
