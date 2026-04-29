import { useEffect, useRef, useState, memo } from 'react'
import type { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}

function Modal({ isOpen, onClose, children, title, className }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(isOpen)
  const [visible, setVisible] = useState(isOpen)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (isOpen) {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
    } else if (mounted) {
      setVisible(false)
      timeout = setTimeout(() => setMounted(false), 200)
    }
    return () => clearTimeout(timeout)
  }, [isOpen, mounted])

  useEffect(() => {
    if (!mounted) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    contentRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Modal'}
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 ${className ?? ''}`}
    >
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={contentRef}
        tabIndex={-1}
        className={`relative bg-white rounded-t-lg sm:rounded-lg shadow-lg w-full max-w-full sm:max-w-lg p-4 mx-auto z-10 transition-all duration-200 ease-out ${
          visible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95'
        }`}
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

export default memo(Modal)
