interface Props {
  title?: string
  body?: string
  variant?: 'pink' | 'yellow'
}

const variants = {
  pink: {
    bg: 'bg-[#fde8f1]',
    title: 'text-[#a8005f]',
    body: 'text-[#3a1224]',
  },
  yellow: {
    bg: 'bg-[#fff4cf]',
    title: 'text-[#8a6500]',
    body: 'text-[#3a2f00]',
  },
} as const

export default function AlertBanner({ title, body, variant = 'pink' }: Props) {
  const v = variants[variant]
  return (
    <div className={`${v.bg} rounded-lg px-lg py-md w-full`}>
      {title && <p className={`${v.title} text-subtitle-md`}>{title}</p>}
      {body && (
        <p className={`${v.body} text-body-md whitespace-pre-line`}>{body}</p>
      )}
    </div>
  )
}
