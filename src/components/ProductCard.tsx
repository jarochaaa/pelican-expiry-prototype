import { useState } from 'react'

interface Props {
  imageUrl: string
  name: string
  expiryDateLabel: string
  instructionChip?: string
  metadata?: string
  trailingTag?: React.ReactNode
  onClick?: () => void
}

export default function ProductCard({
  imageUrl,
  name,
  expiryDateLabel,
  instructionChip,
  metadata,
  trailingTag,
  onClick,
}: Props) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-base-flat border border-border-normal rounded-xl p-md flex flex-col gap-sm text-left active:bg-base-lowest transition-colors"
    >
      <div className="flex items-start gap-md w-full">
        <div className="size-20 rounded-lg bg-base-highest flex-shrink-0 flex items-center justify-center overflow-hidden">
          {imgErr ? (
            <span className="text-text-inverse text-caption text-center px-1">{name.split(' ').slice(0, 2).join(' ')}</span>
          ) : (
            <img
              src={imageUrl}
              alt={name}
              className="max-h-full max-w-full object-contain"
              onError={() => setImgErr(true)}
            />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-xs min-w-0">
          <p className="text-display-sm text-text-primary leading-snug">{name}</p>
          {metadata && <p className="text-body-sm text-text-tertiary">{metadata}</p>}
          <p className="text-body-md text-text-primary">{expiryDateLabel}</p>
        </div>
      </div>
      {(instructionChip || trailingTag) && (
        <div className="flex items-center gap-sm pt-xs">
          {instructionChip && (
            <span className="inline-block bg-base-lowest text-text-secondary text-body-sm px-md py-1 rounded-md">
              {instructionChip}
            </span>
          )}
          {trailingTag}
        </div>
      )}
    </button>
  )
}
