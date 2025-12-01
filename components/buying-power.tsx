"use client"

import { ChevronRight } from "lucide-react"

export function BuyingPower() {
  return (
    <button className="w-full px-4 py-4 flex items-center justify-between border-y border-border">
      <span className="text-foreground font-medium">Buying Power</span>
      <div className="flex items-center gap-2">
        <span className="text-foreground font-medium">$3,247.85</span>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </button>
  )
}
