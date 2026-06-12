import { ArrowLeft, ArrowDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  imageUrl: string
  imageAlt?: string
  backVariant?: 'arrow' | 'down'
  onBack?: () => void
}

export default function ProductHero({ imageUrl, imageAlt = '', backVariant = 'arrow', onBack }: Props) {
  const navigate = useNavigate()
  const handle = onBack ?? (() => navigate(-1))
  const Icon = backVariant === 'down' ? ArrowDown : ArrowLeft
  return (
    <div className="w-full bg-white pt-lg pb-2xl px-lg flex flex-col rounded-b-xl">
      <button
        type="button"
        onClick={handle}
        aria-label="Back"
        className="size-10 -ml-2 flex items-center justify-start text-text-inverse"
      >
        <Icon size={24} strokeWidth={2} />
      </button>
      <div className="flex-1 flex items-center justify-center min-h-[180px] py-md">
        <img src={imageUrl} alt={imageAlt} className="max-h-[180px] object-contain" />
      </div>
    </div>
  )
}
