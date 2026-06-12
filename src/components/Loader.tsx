interface Props {
  size?: number
  className?: string
}

export default function Loader({ size = 48, className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`animate-spin ${className}`}
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r="10" stroke="#ffffff1f" strokeWidth="2.5" fill="none" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
