import type React from "react"
import { FeatureCard } from "./FeatureCard"
import { PencilIcon, UsersIcon, ShareIcon } from "@heroicons/react/24/outline"

export const Features= () => {
  const features = [
    {
      title: "Intuitive Drawing",
      description: "Create beautiful diagrams and sketches with our easy-to-use tools",
      icon: <PencilIcon className="w-12 h-12" />,
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, no matter where you are",
      icon: <UsersIcon className="w-12 h-12" />,
    },
    {
      title: "Easy Sharing",
      description: "Share your creations with a single click and get instant feedback",
      icon: <ShareIcon className="w-12 h-12" />,
    },
  ]

  return (
    <div className="bg-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-caveat font-bold text-center mb-12 text-primary">
          Why Choose belikedaali?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  )
}

