import CountUp from "react-countup"

interface StatCardProps {
  title: string
  value: string
}

export default function StatCard({ title, value }: StatCardProps) {
  const isPercent = value.includes("%")
  const numericValue = parseFloat(value.replace("%", "").trim())
  const isNumber = !isNaN(numericValue)

  return (
    <div className="card p-6 transition hover:scale-[1.02]">
      <p className="text-sm muted">{title}</p>
      <h2 className="mt-3 text-3xl font-semibold text-[var(--primary)] drop-shadow">
        {isNumber ? (
          isPercent ? (
            <>
              <CountUp end={numericValue} duration={0.8} decimals={2} />%
            </>
          ) : (
            <CountUp end={numericValue} duration={0.8} separator="," />
          )
        ) : (
          value
        )}
      </h2>
    </div>
  )
}
