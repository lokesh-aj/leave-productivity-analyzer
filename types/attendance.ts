export interface AttendanceRecord {
  id: string
  date: string
  inTime?: string | null
  outTime?: string | null
  workedHours: number
  isLeave: boolean
}
