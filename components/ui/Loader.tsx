export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-cyan-400" />

      {/* Text */}
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  )
}
