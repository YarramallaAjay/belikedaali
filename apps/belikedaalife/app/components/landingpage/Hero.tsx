import type React from "react"
import Link from "next/link"

export const Hero = () => {
  return (
    <div className="bg-secondary py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-caveat font-bold text-primary mb-6">
            Create, Collaborate, Communicate
          </h1>
          <p className="text-xl sm:text-2xl text-primary mb-10 max-w-3xl mx-auto">
            Bring your ideas to life with our intuitive drawing tool
          </p>
          <Link
            href="/create"
            className="bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent-dark transition-colors duration-300 paint-hover inline-block"
          >
            Start Drawing
          </Link>
        </div>
      </div>
    </div>
  )
}

