"use client"

interface MiniChartProps {
  data: number[]
  positive: boolean
}

export function MiniChart({ data, positive }: MiniChartProps) {
  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = maxValue - minValue || 1

  const width = 60
  const height = 32

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - minValue) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const color = positive ? "oklch(0.72 0.19 145)" : "oklch(0.65 0.2 25)"

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
