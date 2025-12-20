"use client"

import { useEffect, useState } from "react"
import StatCard from "@/components/dashboard/StatCard"
import AttendanceTable from "@/components/dashboard/AttendanceTable"
import Loader from "@/components/ui/Loader"

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

 if (!data) return <Loader text="Loading dashboard..." />

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
  Leave & Productivity
</h1>
<p className="muted mt-1">
  Analytics overview of attendance performance
</p>

        </div>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg border border-[var(--border-color)] bg-white/5 px-3 py-2 text-sm text-white backdrop-blur"

        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Expected Hours" value={`${data.expectedHours}`} />
        <StatCard title="Worked Hours" value={`${data.workedHours}`} />
        <StatCard title="Leaves Used" value={`${data.leavesUsed} / 2`} />
        <StatCard title="Productivity" value={`${data.productivity} %`} />
      </div>

      {/* Table */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Daily Attendance
        </h2>
        <AttendanceTable records={data.records} />
      </div>
    </div>
  )
}
