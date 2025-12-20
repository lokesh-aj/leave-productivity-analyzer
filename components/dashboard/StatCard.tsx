interface StatCardProps {
  title: string
  value: string
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="mt-2 text-2xl font-semibold">{value}</h2>
    </div>
  )
}
