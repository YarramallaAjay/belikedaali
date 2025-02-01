"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw some sample shapes
      ctx.fillStyle = "#3B82F6"
      ctx.beginPath()
      ctx.arc(100 + Math.sin(time / 1000) * 20, 100, 50, 0, 2 * Math.PI)
      ctx.fill()

      ctx.strokeStyle = "#10B981"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(200, 100)
      ctx.lineTo(300, 200)
      ctx.lineTo(200, 300)
      ctx.closePath()
      ctx.stroke()

      ctx.fillStyle = "#F59E0B"
      ctx.fillRect(350 + Math.cos(time / 1000) * 20, 150, 100, 100)

      animationFrameId = requestAnimationFrame(draw)
    }

    draw(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="border-4 border-gray-200 rounded-lg shadow-lg overflow-hidden"
    >
      <canvas ref={canvasRef} width={500} height={400} className="bg-white" />
    </motion.div>
  )
}

