import type React from "react"

interface ExcaliButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const ExcaliButton: React.FC<ExcaliButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="px-6 py-2 text-lg font-bold text-white bg-black rounded paint-hover font-caveat"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`)
      }}
    >
      {children}
    </button>
  )
}

