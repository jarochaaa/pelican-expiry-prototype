export default function Placeholder({ name }: { name: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-fg-muted">
      <div className="text-center">
        <div className="text-fg text-lg font-medium">{name}</div>
        <div className="text-sm mt-2">Pending implementation</div>
      </div>
    </div>
  )
}
