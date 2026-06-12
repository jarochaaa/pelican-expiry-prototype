import { ScanBarcode } from 'lucide-react'
import { useT } from '../i18n/useT'

interface Props {
  onClick: () => void
  disabled?: boolean
}

export default function ScannerButton({ onClick, disabled }: Props) {
  const t = useT()
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={t('scan.button')}
      className="absolute right-lg top-1/2 -translate-y-1/2 z-40 bg-[#ff9000] text-text-inverse rounded-full px-sm py-md flex flex-col items-center gap-xs active:bg-[#e88200] disabled:opacity-60"
      style={{ top: '60%' }}
    >
      <ScanBarcode size={24} strokeWidth={2} />
      <span
        className="text-caption"
        style={{ writingMode: 'vertical-rl' }}
      >
        {t('scan.button')}
      </span>
    </button>
  )
}
