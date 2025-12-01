"use client"

import { Bell, User } from "lucide-react"

export function PortfolioHeader() {
  const portfolioValue = 24847.52
  const todayChange = 342.18
  const todayChangePercent = 1.4

  return (
    <header className="px-4 pt-12 pb-4">
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground text-sm mb-1">Investing</p>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          ${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-primary font-medium">
            +${todayChange.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-primary font-medium">(+{todayChangePercent.toFixed(2)}%)</span>
          <span className="text-muted-foreground text-sm">Today</span>
        </div>
      </div>
    </header>
  )
}
