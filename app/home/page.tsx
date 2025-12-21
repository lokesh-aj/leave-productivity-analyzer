"use client"

import UploadPage from "@/app/upload/page"
import DashboardPage from "@/app/dashboard/page"

export default function HomePage() {
  return (
    <div className="space-y-10 p-6">
      <UploadPage />
      <DashboardPage />
    </div>
  )
}
