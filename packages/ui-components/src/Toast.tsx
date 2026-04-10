import React, { useEffect } from 'react'

type Props = {
  open: boolean
  message: string
  onClose?: () => void
  duration?: number
  className?: string
}

export default function Toast({ open, message, onClose, duration = 4000, className }: Props) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(t)
  }, [open, duration, onClose])

  if (!open) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className ?? ''}`} aria-live="polite">
      <div className="bg-gray-900 text-white px-4 py-2 rounded shadow-md max-w-xs">
        <div className="flex items-start gap-3">
          <div className="flex-1 text-sm">{message}</div>
          <button
            onClick={() => onClose?.()}
            aria-label="Close notification"
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
