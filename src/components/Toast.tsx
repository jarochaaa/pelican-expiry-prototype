import { X } from 'lucide-react'

interface Props {
  message: string
  onDismiss: () => void
}

export default function Toast({ message, onDismiss }: Props) {
  return (
    <div className="mx-lg my-md flex items-center gap-md bg-[#e2f3d3] text-[#2f6b14] rounded-lg px-lg py-md">
      <span className="flex-1 text-subtitle-md">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="text-[#2f6b14]"
      >
        <X size={18} strokeWidth={2} />
      </button>
    </div>
  )
}
