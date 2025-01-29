import type * as React from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, ...props }) => (
  <div {...props} className="w-10 h-10 rounded-full overflow-hidden">
    {src ? (
      <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
        {alt ? alt.charAt(0).toUpperCase() : "?"}
      </div>
    )}
  </div>
)

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img {...props} className="w-full h-full object-cover" />
)

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div {...props} className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600" />
)

