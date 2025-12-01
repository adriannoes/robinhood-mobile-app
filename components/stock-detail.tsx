"use client"

import { useState } from "react"
import { ArrowLeft, Star, Share2, MoreHorizontal } from "lucide-react"
import type { Stock } from "@/app/page"
import { StockDetailChart } from "./stock-detail-chart"
import { TimeRangeTabs } from "./time-range-tabs"
import { TradeButtons } from "./trade-buttons"
import { StockStats } from "./stock-stats"
import { TradeModal } from "./trade-modal"

interface StockDetailProps {
  stock: Stock
  onBack: () => void
}

export function StockDetail({ stock, onBack }: StockDetailProps) {
  const [timeRange, setTimeRange] = useState("1D")
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null)
  const [isFavorite, setIsFavorite] = useState(true)
  const isPositive = stock.change >= 0

  return (
    <main className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsFavorite(!isFavorite)}>
              <Star className={`w-6 h-6 ${isFavorite ? "fill-primary text-primary" : "text-foreground"}`} />
            </button>
            <button>
              <Share2 className="w-6 h-6 text-foreground" />
            </button>
            <button>
              <MoreHorizontal className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4">
        <h1 className="text-2xl font-bold text-foreground">{stock.symbol}</h1>
        <p className="text-muted-foreground mb-4">{stock.name}</p>

        <div className="mb-2">
          <span className="text-4xl font-bold text-foreground">
            ${stock.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <span className={`font-medium ${isPositive ? "text-primary" : "text-destructive"}`}>
            {isPositive ? "+" : ""}${Math.abs(stock.change).toFixed(2)}
          </span>
          <span className={`font-medium ${isPositive ? "text-primary" : "text-destructive"}`}>
            ({isPositive ? "+" : ""}
            {stock.changePercent.toFixed(2)}%)
          </span>
          <span className="text-muted-foreground text-sm">Today</span>
        </div>
      </div>

      <StockDetailChart symbol={stock.symbol} timeRange={timeRange} positive={isPositive} />
      <TimeRangeTabs selected={timeRange} onSelect={setTimeRange} />

      <StockStats stock={stock} />

      <TradeButtons onBuy={() => setTradeType("buy")} onSell={() => setTradeType("sell")} />

      {tradeType && <TradeModal stock={stock} type={tradeType} onClose={() => setTradeType(null)} />}
    </main>
  )
}
