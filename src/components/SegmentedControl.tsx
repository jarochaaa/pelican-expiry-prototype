interface Segment {
  key: string
  label: string
}

interface Props {
  segments: Segment[]
  activeKey: string
  onChange: (key: string) => void
}

export default function SegmentedControl({ segments, activeKey, onChange }: Props) {
  return (
    <div className="flex gap-sm">
      {segments.map((seg) => {
        const active = seg.key === activeKey
        return (
          <button
            key={seg.key}
            type="button"
            onClick={() => onChange(seg.key)}
            className={`h-10 px-lg rounded-pill text-subtitle-md transition-colors ${
              active
                ? 'bg-base-highest text-text-inverse'
                : 'bg-base-flat text-text-primary border border-border-normal'
            }`}
          >
            {seg.label}
          </button>
        )
      })}
    </div>
  )
}
