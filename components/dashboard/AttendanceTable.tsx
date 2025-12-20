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
   <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--primary-soft)] text-left">
          <tr className="text-left text-slate-600 dark:text-slate-300">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">In Time</th>
            <th className="px-4 py-3 font-medium">Out Time</th>
            <th className="px-4 py-3 font-medium">Worked Hours</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr
  key={record.id}
  className={`border-t border-[var(--border-color)] ${
    record.isLeave ? "bg-red-500/10" : "hover:bg-white/5"
  }`}
>

              <td className="px-4 py-3">
                {dayjs(record.date).format("DD MMM YYYY")}
              </td>

              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {record.inTime || "-"}
              </td>

              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {record.outTime || "-"}
              </td>

              <td className="px-4 py-3 font-medium">
                {record.workedHours.toFixed(2)}
              </td>

              <td className="px-4 py-3">
                {record.isLeave ? (
                  <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                    Leave
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    Present
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
