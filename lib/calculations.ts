import dayjs from "dayjs"

// Expected working hours based on day
export function getExpectedHours(date: Date): number {
  const day = dayjs(date).day()

  if (day === 0) return 0        // Sunday
  if (day === 6) return 4        // Saturday
  return 8.5                    // Monday–Friday
}

// Calculate worked hours from in & out time
export function calculateWorkedHours(
  inTime?: string,
  outTime?: string
): number {
  if (!inTime || !outTime) return 0

  const start = dayjs(`2024-01-01 ${inTime}`)
  const end = dayjs(`2024-01-01 ${outTime}`)

  return end.diff(start, "minute") / 60
}
