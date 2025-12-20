interface StatCardProps {
  title: string
  value: string
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="card p-6 transition hover:scale-[1.02]">
      <p className="text-sm muted">{title}</p>
      <h2 className="mt-3 text-3xl font-semibold text-[var(--primary)] drop-shadow">
        {value}
      </h2>
    </div>
  )
}
