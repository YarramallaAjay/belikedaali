import type React from "react"
import { useState } from "react"

interface ExcaliInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const ExcaliInput: React.FC<ExcaliInputProps> = ({ label, ...props }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="mb-4">
      <label className="block mb-2 text-lg font-caveat">{label}</label>
      <input
        {...props}
        className={`w-full px-3 py-2 text-lg bg-transparent border-2 border-black rounded paint-hover font-caveat ${
          isActive ? "border-red-500" : ""
        }`}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`)
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`)
        }}
      />
    </div>
  )
}

