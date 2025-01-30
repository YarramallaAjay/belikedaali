import type React from "react"
import Link from "next/link"

export const Footer= () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-caveat font-bold text-primary">
              belikedaali
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-primary hover:text-accent transition-colors duration-300">
              About
            </Link>
            <Link href="/privacy" className="text-primary hover:text-accent transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="text-primary hover:text-accent transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-primary">
          © {new Date().getFullYear()} belikedaali. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

