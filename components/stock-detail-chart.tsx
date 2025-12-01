"use client"

import { useMemo } from "react"
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts"

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
    return {
      time: i,
      value: baseValue + trend + noise,
    }
  })
}

export function StockDetailChart({ symbol, timeRange, positive }: StockDetailChartProps) {
  const data = useMemo(() => generateDetailChartData(symbol, timeRange), [symbol, timeRange])

  const minValue = Math.min(...data.map((d) => d.value))
  const maxValue = Math.max(...data.map((d) => d.value))
  const padding = (maxValue - minValue) * 0.1

  const color = positive ? "oklch(0.72 0.19 145)" : "oklch(0.65 0.2 25)"

  return (
    <div className="px-4 h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`colorDetail-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={[minValue - padding, maxValue + padding]} hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#colorDetail-${symbol})`}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
