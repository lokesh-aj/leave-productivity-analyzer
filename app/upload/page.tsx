"use client"

import { useState } from "react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    setLoading(false)
    setMessage(data.message)
    setShowPopup(true)
  }

  return (
    <>
      <div className="mx-auto max-w-xl p-6">
        <div className="card p-6 space-y-5">
          <div>
            <h1 className="text-xl font-semibold">
              Upload Attendance Excel
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Upload a .xlsx file to analyze attendance and productivity
            </p>
          </div>

          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-white p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
          />

          {/* File name display */}
          {file && (
            <p className="text-sm text-slate-600">
              📄 Selected file:{" "}
              <span className="font-medium">{file.name}</span>
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Excel"}
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="card mx-auto max-w-xl p-8 space-y-6">
            <h2 className="text-lg font-semibold text-green-600">
              Upload Successful 🎉
            </h2>

            <p className="text-sm text-slate-600">
              {message || "Excel file uploaded successfully."}
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
