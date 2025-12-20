"use client"

import { useEffect, useState } from "react"
import StatCard from "@/components/dashboard/StatCard"
import AttendanceTable from "@/components/dashboard/AttendanceTable"

export default function DashboardPage() {
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  )
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/dashboard?month=${month}`)
      .then((res) => res.json())
      .then(setData)
  }, [month])

  if (!data) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Leave & Productivity Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of attendance and productivity
          </p>
        </div>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Expected Hours" value={`${data.expectedHours}`} />
        <StatCard title="Worked Hours" value={`${data.workedHours}`} />
        <StatCard title="Leaves Used" value={`${data.leavesUsed} / 2`} />
        <StatCard title="Productivity" value={`${data.productivity} %`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Daily Attendance</h2>
        <AttendanceTable records={data.records} />
      </div>
    </div>
  )
}
