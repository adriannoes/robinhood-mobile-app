"use client"

import { Home, Search, Repeat, BarChart3, User } from "lucide-react"
import { useState } from "react"

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Search", active: false },
  { icon: Repeat, label: "Transfer", active: false },
  { icon: BarChart3, label: "Investing", active: false },
  { icon: User, label: "Profile", active: false },
]

export function BottomNav() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-2 pb-6 pt-2">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeIndex === index ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
