"use client"

import { Home, Search, Repeat, BarChart3, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Search, label: "Search", id: "search" },
  { icon: Repeat, label: "Transfer", id: "transfer" },
  { icon: BarChart3, label: "Investing", id: "investing" },
  { icon: User, label: "Profile", id: "profile" },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-2 pb-6 pt-2">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === item.id ? "text-primary" : "text-muted-foreground"
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
