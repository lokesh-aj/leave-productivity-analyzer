import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { parseExcel } from "@/lib/excel"
import { calculateWorkedHours } from "@/lib/calculations"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const rows: any[] = parseExcel(buffer)

    for (const row of rows) {
      const workedHours = calculateWorkedHours(
        row["In-Time"],
        row["Out-Time"]
      )

      const isLeave = !row["In-Time"] || !row["Out-Time"]

      await prisma.attendance.create({
        data: {
          employeeName: row["Employee Name"],
          date: new Date(row["Date"]),
          inTime: row["In-Time"],
          outTime: row["Out-Time"],
          workedHours,
          isLeave,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    )
  }
}
