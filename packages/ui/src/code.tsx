import type * as React from "react"

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
    {children}
  </div>
)

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className="px-6 py-4 border-b shrink-0">
    {children}
  </div>
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => (
  <h2 {...props} className="text-xl font-semibold">
    {children}
  </h2>
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className="px-6 py-4 flex-grow overflow-hidden">
    {children}
  </div>
)

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className="px-6 py-4 border-t shrink-0">
    {children}
  </div>
)

