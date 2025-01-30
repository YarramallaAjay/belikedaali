import type React from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const FeatureCard= ({ title, description, icon }:FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md paint-hover transition-shadow duration-300 hover:shadow-lg">
      <div className="text-accent mb-4 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-caveat font-bold mb-3 text-center">{title}</h3>
      <p className="text-primary text-center">{description}</p>
    </div>
  )
}

