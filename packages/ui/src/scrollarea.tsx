/* eslint-disable @typescript-eslint/no-empty-object-type */
import type * as React from "react"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, ...props }) => (
  <div {...props} className="overflow-auto h-full">
    {children}
  </div>
)

