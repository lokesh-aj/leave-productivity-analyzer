"use client"

import { useState } from "react"
import UploadPage from "@/app/upload/page"
import DashboardPage from "@/app/dashboard/page"

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadSuccess = () => {
    // Change key to force DashboardPage re-render
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-10 p-6">
      <UploadPage onUploadSuccess={handleUploadSuccess} />
      <DashboardPage key={refreshKey} />
    </div>
  )
}
