"use client"

import { useMemo } from "react"

interface StockDetailChartProps {
  symbol: string
  timeRange: string
  positive: boolean
}

const generateDetailChartData = (symbol: string, timeRange: string) => {
  const baseValue = symbol === "TSLA" ? 250 : symbol === "NVDA" ? 870 : symbol === "MSFT" ? 375 : 175
  const points =
    timeRange === "1D" ? 78 : timeRange === "1W" ? 7 : timeRange === "1M" ? 30 : timeRange === "3M" ? 90 : 365

  const seed = symbol.charCodeAt(0)
  return Array.from({ length: points }, (_, i) => {
    const volatility = timeRange === "1D" ? baseValue * 0.02 : baseValue * 0.08
    const trend = (i / points) * (baseValue * 0.05)
    const noise = (Math.sin((i * seed) / 10) + Math.cos(i / 5)) * volatility * 0.5
    return baseValue + trend + noise
  })
}

export function StockDetailChart({ symbol, timeRange, positive }: StockDetailChartProps) {
  const data = useMemo(() => generateDetailChartData(symbol, timeRange), [symbol, timeRange])

  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = maxValue - minValue || 1

  const width = 400
  const height = 220
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

  const color = positive ? "oklch(0.72 0.19 145)" : "oklch(0.65 0.2 25)"

  return (
    <div className="px-4 h-56">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`detailGradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#detailGradient-${symbol})`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  )
}
