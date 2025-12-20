import dayjs from "dayjs"

interface AttendanceRecord {
  id: string
  date: string
  inTime?: string
  outTime?: string
  workedHours: number
  isLeave: boolean
}

export default function AttendanceTable({
  records,
}: {
  records: AttendanceRecord[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">In Time</th>
            <th className="p-3">Out Time</th>
            <th className="p-3">Worked Hours</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="p-3">
                {dayjs(record.date).format("DD MMM YYYY")}
              </td>
              <td className="p-3">{record.inTime || "-"}</td>
              <td className="p-3">{record.outTime || "-"}</td>
              <td className="p-3">{record.workedHours}</td>
              <td className="p-3">
                {record.isLeave ? (
                  <span className="text-red-600 font-medium">Leave</span>
                ) : (
                  <span className="text-green-600 font-medium">Present</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
