import Loader from './Loader'

interface Props {
  open: boolean
  label?: string
}

export default function ScanLoaderOverlay({ open, label = 'Scanning…' }: Props) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center gap-md"
      style={{ width: '100%', height: '100%' }}
    >
      <Loader size={56} />
      <span className="text-subtitle-md text-text-primary">{label}</span>
    </div>
  )
}
