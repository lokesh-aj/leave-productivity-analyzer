import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const month = searchParams.get("month")
  const employee = searchParams.get("employee") // new: optional employee filter

  const baseDate = month ? dayjs(month) : dayjs()
  const startOfMonth = baseDate.startOf("month").toDate()
  const endOfMonth = baseDate.endOf("month").toDate()

  const attendance = await prisma.attendance.findMany({
    where: {
      date: { gte: startOfMonth, lte: endOfMonth },
      ...(employee
        ? { employeeName: { contains: employee, mode: "insensitive" } }
        : {}),
    },
    orderBy: { date: "asc" },
  })

  let expectedHours = 0
  let workedHours = 0
  let leavesUsed = 0

  attendance.forEach((record) => {
    const day = dayjs(record.date).day()
    if (day !== 0) expectedHours += day === 6 ? 4 : 8.5
    workedHours += record.workedHours
    if (record.isLeave) leavesUsed++
  })

  const productivity =
    expectedHours > 0 ? ((workedHours / expectedHours) * 100).toFixed(2) : "0"

  return NextResponse.json({
    expectedHours,
    workedHours,
    leavesUsed,
    productivity,
    records: attendance,
  })
}
