export default function TopicLoading() {
  return (
    <div className="grid gap-4">
      <div className="h-32 animate-pulse border border-border bg-muted/40" />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="h-80 animate-pulse border border-border bg-muted/40" />
        <div className="h-80 animate-pulse border border-border bg-muted/40" />
      </div>
    </div>
  )
}
