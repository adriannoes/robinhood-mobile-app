"use client"

import type { Stock } from "@/app/page"
import { StockCard } from "./stock-card"

interface WatchlistSectionProps {
  stocks: Stock[]
  onSelectStock: (stock: Stock) => void
}

export function WatchlistSection({ stocks, onSelectStock }: WatchlistSectionProps) {
  return (
    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Watchlist</h2>
        <button className="text-primary text-sm font-medium">Edit</button>
      </div>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} onClick={() => onSelectStock(stock)} />
        ))}
      </div>
    </section>
  )
}
