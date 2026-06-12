import { MapPin, Trash2 } from 'lucide-react'
import { useT } from '../i18n/useT'

type Phase = 'scanning' | 'result'

interface Props {
  open: boolean
  phase: Phase
  scannedLocation: string
  onCancel: () => void
  onYes: () => void
  onNo: () => void
  onDeleteLocation?: () => void
}

export default function ScanSheet({
  open,
  phase,
  scannedLocation,
  onCancel,
  onYes,
  onNo,
  onDeleteLocation,
}: Props) {
  const t = useT()
  if (!open) return null

  return (
    <div
      className="absolute inset-0 bg-black/60 flex items-end z-30"
      onClick={onCancel}
    >
      <div
        className="w-full bg-base-low rounded-t-xl px-lg pt-lg pb-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {phase === 'scanning' && (
          <>
            <p className="text-display-sm text-text-primary text-center pb-md">
              {t('scan.locationStep')}
            </p>
            <div className="border border-dashed border-border-high rounded-xl px-lg py-md flex items-center gap-sm text-text-tertiary">
              <MapPin size={18} strokeWidth={1.75} />
              <span className="text-body-md">{scannedLocation}</span>
            </div>
          </>
        )}

        {phase === 'result' && (
          <>
            <p className="text-subtitle-md text-text-primary pb-sm">{t('scan.locationLabel')}</p>
            <div className="bg-base-flat border border-border-normal rounded-xl px-lg py-md flex items-center gap-sm">
              <MapPin size={18} strokeWidth={1.75} className="text-text-tertiary" />
              <span className="text-body-md text-text-primary flex-1">{scannedLocation}</span>
              <button
                type="button"
                onClick={onDeleteLocation}
                aria-label={t('scan.removeAria')}
                className="text-text-primary"
              >
                <Trash2 size={18} strokeWidth={1.75} />
              </button>
            </div>

            <p className="text-subtitle-md text-text-primary pt-lg pb-md">
              {t('scan.questionDates')}
            </p>

            <div className="flex flex-col gap-sm">
              <button
                type="button"
                onClick={onYes}
                className="w-full h-12 rounded-pill bg-base-highest text-text-inverse text-display-sm"
              >
                {t('scan.yes')}
              </button>
              <button
                type="button"
                onClick={onNo}
                className="w-full h-12 rounded-pill bg-transparent border border-border-high text-text-primary text-display-sm"
              >
                {t('scan.no')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
