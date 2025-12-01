"use client"

interface TradeButtonsProps {
  onBuy: () => void
  onSell: () => void
}

export function TradeButtons({ onBuy, onSell }: TradeButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
      <div className="max-w-md mx-auto flex gap-4">
        <button
          onClick={onSell}
          className="flex-1 py-4 rounded-full bg-secondary text-foreground font-semibold text-lg transition-colors hover:bg-secondary/80"
        >
          Sell
        </button>
        <button
          onClick={onBuy}
          className="flex-1 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-colors hover:bg-primary/90"
        >
          Buy
        </button>
      </div>
    </div>
  )
}
