import type React from "react"
import { useState } from "react"

interface ExcaliCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const ExcaliCheckbox: React.FC<ExcaliCheckboxProps> = ({ label, ...props }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        {...props}
        className={`w-5 h-5 mr-2 paint-hover ${isActive ? "bg-red-500" : ""}`}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`)
          e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`)
        }}
      />
      <label className="text-lg font-caveat">{label}</label>
    </div>
  )
}

