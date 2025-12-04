"use client"

import { useMemo } from "react"

interface PortfolioChartProps {
  timeRange: string
}

const generateChartData = (timeRange: string) => {
  const baseValue = 24500
  const points =
    timeRange === "1D" ? 78 : timeRange === "1W" ? 7 : timeRange === "1M" ? 30 : timeRange === "3M" ? 90 : 365

  return Array.from({ length: points }, (_, i) => {
    const volatility = timeRange === "1D" ? 50 : timeRange === "1W" ? 200 : 500
    const trend = (i / points) * 400
    const noise = (Math.random() - 0.3) * volatility
    return baseValue + trend + noise + Math.sin(i / 5) * 100
  })
}

export function PortfolioChart({ timeRange }: PortfolioChartProps) {
  const data = useMemo(() => generateChartData(timeRange), [timeRange])

  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = maxValue - minValue || 1

  const width = 400
  const height = 180
  const padding = 10

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - padding - ((value - minValue) / range) * (height - padding * 2)
      return `${x},${y}`
    })
    .join(" ")

  const areaPath = `M0,${height} L${points
    .split(" ")
    .map((p, i) => (i === 0 ? p : `L${p}`))
    .join(" ")} L${width},${height} Z`

  const linePath = `M${points.split(" ").join(" L")}`

  return (
    <div className="px-4 h-48">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.19 145)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.72 0.19 145)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartGradient)" />
        <polyline points={points} fill="none" stroke="oklch(0.72 0.19 145)" strokeWidth="2" />
      </svg>
    </div>
  )
}
