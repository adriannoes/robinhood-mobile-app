"use client"

import type { Stock } from "@/app/page"
import { MiniChart } from "./mini-chart"

interface StockCardProps {
  stock: Stock
  onClick: () => void
}

export function StockCard({ stock, onClick }: StockCardProps) {
  const isPositive = stock.change >= 0

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-xl bg-card hover:bg-secondary transition-colors"
    >
      <div className="flex-1 text-left">
        <p className="font-semibold text-foreground">{stock.symbol}</p>
        <p className="text-sm text-muted-foreground truncate max-w-[100px]">{stock.name}</p>
      </div>

      <div className="w-16 h-10 mx-4">
        <MiniChart data={stock.chartData} positive={isPositive} />
      </div>

      <div className="text-right">
        <p className="font-semibold text-foreground">
          ${stock.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-sm font-medium ${isPositive ? "text-primary" : "text-destructive"}`}>
          {isPositive ? "+" : ""}
          {stock.changePercent.toFixed(2)}%
        </p>
      </div>
    </button>
  )
}
