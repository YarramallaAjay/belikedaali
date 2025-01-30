import type React from "react"
import Link from "next/link"

export const AppBar= () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-caveat font-bold text-primary">
              belikedaali
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-primary hover:text-accent font-medium paint-hover">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-accent-dark transition-colors duration-300 paint-hover"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

