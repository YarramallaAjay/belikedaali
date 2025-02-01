import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: keyof typeof Icons
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const Icon = Icons[icon] as LucideIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}


