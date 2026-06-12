interface Segment {
  key: string
  label: string
  count: number
}

interface Props {
  segments: Segment[]
  activeKey: string
  onChange: (key: string) => void
}

export default function SegmentedCount({ segments, activeKey, onChange }: Props) {
  return (
    <div className="flex gap-sm">
      {segments.map((seg) => {
        const active = seg.key === activeKey
        return (
          <button
            key={seg.key}
            type="button"
            onClick={() => onChange(seg.key)}
            className={`h-10 px-lg rounded-pill text-subtitle-md flex items-center gap-sm transition-colors ${
              active
                ? 'bg-base-highest text-text-inverse'
                : 'bg-base-flat text-text-primary border border-border-normal'
            }`}
          >
            {seg.label}
            <span
              className={`inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full text-body-sm ${
                active ? 'bg-text-inverse text-text-primary' : 'bg-base-lowest text-text-primary'
              }`}
            >
              {seg.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
