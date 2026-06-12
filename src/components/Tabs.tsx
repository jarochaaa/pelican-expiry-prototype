interface Tab {
  key: string
  label: string
}

interface Props {
  tabs: Tab[]
  activeKey: string
  onChange: (key: string) => void
}

export default function Tabs({ tabs, activeKey, onChange }: Props) {
  return (
    <div className="w-full border-b border-border-normal">
      <div className="flex gap-sm px-lg">
        {tabs.map((tab) => {
          const active = tab.key === activeKey
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className="relative flex flex-col items-center pt-sm pb-0"
            >
              <span
                className={`text-display-sm px-sm pb-sm ${
                  active ? 'text-text-primary' : 'text-text-tertiary'
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-text-primary rounded-t-sm" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
