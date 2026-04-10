import React, { useEffect, useRef } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export default function Modal({ isOpen, onClose, children, title, className }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    // focus
    contentRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Modal'}
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${className ?? ''}`}
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={contentRef}
        tabIndex={-1}
        className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-4 mx-auto z-10"
      >
        {title ? <h2 className="text-lg font-semibold mb-2">{title}</h2> : null}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
