"use client"

import type { Stock } from "@/app/page"

interface StockStatsProps {
  stock: Stock
}

export function StockStats({ stock }: StockStatsProps) {
  const stats = [
    { label: "Open", value: `$${(stock.price - stock.change).toFixed(2)}` },
    { label: "High", value: `$${(stock.price * 1.015).toFixed(2)}` },
    { label: "Low", value: `$${(stock.price * 0.985).toFixed(2)}` },
    { label: "Vol", value: "24.5M" },
    { label: "P/E", value: "28.5" },
    { label: "Mkt Cap", value: stock.price > 500 ? "1.24T" : stock.price > 300 ? "2.8T" : "2.9T" },
    { label: "52W H", value: `$${(stock.price * 1.25).toFixed(2)}` },
    { label: "52W L", value: `$${(stock.price * 0.65).toFixed(2)}` },
  ]

  return (
    <section className="px-4 py-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-between">
            <span className="text-muted-foreground">{stat.label}</span>
            <span className="text-foreground font-medium">{stat.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
