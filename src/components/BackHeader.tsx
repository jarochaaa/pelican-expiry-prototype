import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../i18n/useT'

interface Props {
  title?: string
  onBack?: () => void
}

export default function BackHeader({ title, onBack }: Props) {
  const navigate = useNavigate()
  const t = useT()
  const handleBack = onBack ?? (() => navigate(-1))
  return (
    <div className="sticky top-0 z-30 bg-base-lowest w-full">
      <div className="flex items-center gap-md px-lg py-lg">
        <button
          type="button"
          onClick={handleBack}
          aria-label={t('common.back')}
          className="size-10 flex items-center justify-center -ml-md text-text-primary"
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        {title && (
          <h1 className="text-display-md text-text-primary" style={{ fontVariationSettings: '"opsz" 25' }}>
            {title}
          </h1>
        )}
      </div>
    </div>
  )
}
