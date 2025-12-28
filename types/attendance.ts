export interface AttendanceRecord {
  id: string
  employeeName: string
  date: string
  inTime?: string | null
  outTime?: string | null
  workedHours: number
  isLeave: boolean
}
