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
      const date = dayjs(row.Date).toDate()
      const day = dayjs(date).day()

      let workedHours = 0
      let isLeave = false

      if (!row["In-Time"] || !row["Out-Time"]) {
        if (day !== 0) isLeave = true
      } else {
        const inTime = dayjs(`${row.Date} ${row["In-Time"]}`)
        const outTime = dayjs(`${row.Date} ${row["Out-Time"]}`)
        workedHours = outTime.diff(inTime, "hour", true)
      }

      await prisma.attendance.create({
        data: {
          employeeName: row["Employee Name"],
          date,
          inTime: row["In-Time"] || null,
          outTime: row["Out-Time"] || null,
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
