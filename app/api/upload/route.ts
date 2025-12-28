import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as XLSX from "xlsx"
import dayjs from "dayjs"

interface ExcelRow {
  "Employee Name": string
  Date: string
  "In-Time"?: string
  "Out-Time"?: string
}

function normalizeExcelTime(value: any): string | null {
  if (!value) return null

  if (typeof value === "number") {
    const totalMinutes = Math.round(value * 24 * 60)
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0")
    const minutes = String(totalMinutes % 60).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  return String(value)
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet)

    for (const row of rows) {
      const date = dayjs(row.Date).startOf("day").toDate()
      const day = dayjs(date).day()
      
      let workedHours = 0
      let isLeave = false

      const hasInTime = row["In-Time"] && String(row["In-Time"]).trim() !== ""
      const hasOutTime = row["Out-Time"] && String(row["Out-Time"]).trim() !== ""


      const inTimeStr = normalizeExcelTime(row["In-Time"])
      const outTimeStr = normalizeExcelTime(row["Out-Time"])

      if (!inTimeStr || !outTimeStr) {
        if (day !== 0) isLeave = true
      } else {
        const inTime = dayjs(`${row.Date} ${inTimeStr}`)
        const outTime = dayjs(`${row.Date} ${outTimeStr}`)
        workedHours = outTime.diff(inTime, "hour", true)
      }


      const existing = await prisma.attendance.findFirst({
        where: {
          employeeName: row["Employee Name"],
          date,
        },
      })

      if (existing) {
        continue
      }

      await prisma.attendance.create({
        data: {
          employeeName: row["Employee Name"],
          date,
          inTime: inTimeStr,
          outTime: outTimeStr,
          workedHours,
          isLeave,
        },
      })


    }

    return NextResponse.json({
      message: "Attendance data uploaded successfully",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    )
  }
}
