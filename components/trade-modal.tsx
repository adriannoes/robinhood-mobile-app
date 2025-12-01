"use client"

import { useState } from "react"
import { X, Minus, Plus, Check } from "lucide-react"
import type { Stock } from "@/app/page"

interface TradeModalProps {
  stock: Stock
  type: "buy" | "sell"
  onClose: () => void
}

export function TradeModal({ stock, type, onClose }: TradeModalProps) {
  const [shares, setShares] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = shares * stock.price
  const isBuy = type === "buy"

  const handleOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 animate-in zoom-in duration-300">
          <Check className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
        <p className="text-muted-foreground text-center">
          You {isBuy ? "bought" : "sold"} {shares} {shares === 1 ? "share" : "shares"} of {stock.symbol}
        </p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <header className="flex items-center justify-between p-4 pt-12">
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6 text-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">
          {isBuy ? "Buy" : "Sell"} {stock.symbol}
        </h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground mb-4">Shares</p>

        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={() => setShares(Math.max(1, shares - 1))}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
          >
            <Minus className="w-6 h-6 text-foreground" />
          </button>
          <span className="text-6xl font-bold text-foreground w-24 text-center">{shares}</span>
          <button
            onClick={() => setShares(shares + 1)}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
          >
            <Plus className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="bg-card rounded-2xl p-4 w-full max-w-sm space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Market Price</span>
            <span className="text-foreground font-medium">
              ${stock.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <span className="text-foreground font-semibold">Estimated Total</span>
            <span className="text-foreground font-bold">
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 pb-8">
        <button
          onClick={handleOrder}
          className={`w-full py-4 rounded-full font-semibold text-lg transition-colors ${
            isBuy
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          }`}
        >
          {isBuy ? "Buy" : "Sell"} {shares} {shares === 1 ? "Share" : "Shares"}
        </button>
      </div>
    </div>
  )
}
