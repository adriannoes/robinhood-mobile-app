"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, Search, TrendingUp, TrendingDown, X } from "lucide-react"
import { MiniChart } from "./mini-chart"
import type { Stock } from "@/app/page"

interface SearchScreenProps {
  stocks: Stock[]
  onSelectStock: (stock: Stock) => void
  onBack: () => void
}

const categories = ["All", "Tech", "Finance", "Healthcare", "Energy", "Consumer"]

const allStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.72,
    change: 2.34,
    changePercent: 1.33,
    chartData: [170, 172, 171, 174, 176, 175, 178, 177, 179, 178.72],
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.5,
    change: -5.2,
    changePercent: -2.05,
    chartData: [260, 258, 255, 252, 250, 248, 251, 249, 247, 248.5],
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    price: 875.28,
    change: 15.42,
    changePercent: 1.79,
    chartData: [850, 855, 860, 858, 865, 870, 868, 872, 878, 875.28],
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    price: 378.91,
    change: 4.12,
    changePercent: 1.1,
    chartData: [370, 372, 374, 373, 375, 376, 377, 378, 379, 378.91],
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    price: 178.25,
    change: -1.85,
    changePercent: -1.03,
    chartData: [182, 181, 180, 179, 178, 179, 178, 177, 178, 178.25],
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    price: 141.8,
    change: 2.15,
    changePercent: 1.54,
    chartData: [138, 139, 140, 139, 140, 141, 140, 141, 142, 141.8],
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 505.75,
    change: 8.25,
    changePercent: 1.66,
    chartData: [490, 495, 498, 500, 502, 504, 503, 505, 506, 505.75],
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    price: 195.42,
    change: 1.28,
    changePercent: 0.66,
    chartData: [192, 193, 194, 193, 194, 195, 194, 195, 196, 195.42],
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    price: 275.89,
    change: 3.45,
    changePercent: 1.27,
    chartData: [270, 271, 272, 273, 274, 275, 274, 275, 276, 275.89],
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 156.34,
    change: -0.82,
    changePercent: -0.52,
    chartData: [158, 157, 157, 156, 157, 156, 156, 156, 156, 156.34],
  },
  {
    symbol: "XOM",
    name: "Exxon Mobil",
    price: 104.56,
    change: 2.18,
    changePercent: 2.13,
    chartData: [100, 101, 102, 103, 103, 104, 103, 104, 105, 104.56],
  },
  {
    symbol: "PG",
    name: "Procter & Gamble",
    price: 158.92,
    change: 0.45,
    changePercent: 0.28,
    chartData: [157, 157, 158, 158, 158, 159, 158, 159, 159, 158.92],
  },
  {
    symbol: "DIS",
    name: "Walt Disney Co",
    price: 112.45,
    change: -2.34,
    changePercent: -2.04,
    chartData: [116, 115, 114, 114, 113, 113, 112, 112, 112, 112.45],
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc",
    price: 628.15,
    change: 12.85,
    changePercent: 2.09,
    chartData: [610, 615, 618, 620, 622, 625, 624, 626, 628, 628.15],
  },
  {
    symbol: "AMD",
    name: "AMD Inc",
    price: 178.92,
    change: 5.67,
    changePercent: 3.27,
    chartData: [170, 172, 174, 175, 176, 177, 178, 178, 179, 178.92],
  },
]

const trendingStocks = allStocks.slice(0, 5)
const topGainers = allStocks
  .filter((s) => s.changePercent > 0)
  .sort((a, b) => b.changePercent - a.changePercent)
  .slice(0, 3)
const topLosers = allStocks
  .filter((s) => s.changePercent < 0)
  .sort((a, b) => a.changePercent - b.changePercent)
  .slice(0, 3)

export function SearchScreen({ stocks, onSelectStock, onBack }: SearchScreenProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredStocks = useMemo(() => {
    if (!query) return []
    return allStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stocks"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-secondary rounded-xl py-3 pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {query ? (
        <div className="px-4">
          <p className="text-muted-foreground text-sm mb-4">
            {filteredStocks.length} result{filteredStocks.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-2">
            {filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => onSelectStock(stock)}
                className="w-full flex items-center justify-between p-4 bg-card rounded-xl active:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">{stock.symbol.slice(0, 2)}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${stock.price.toFixed(2)}</p>
                  <p className={`text-sm ${stock.change >= 0 ? "text-primary" : "text-destructive"}`}>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 space-y-6">
          {/* Trending */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Trending</h2>
            </div>
            <div className="space-y-2">
              {trendingStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock)}
                  className="w-full flex items-center justify-between p-4 bg-card rounded-xl active:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">{stock.symbol.slice(0, 2)}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[120px]">{stock.name}</p>
                    </div>
                  </div>
                  <div className="w-16 h-8">
                    <MiniChart data={stock.chartData} positive={stock.change >= 0} />
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${stock.price.toFixed(2)}</p>
                    <p className={`text-sm ${stock.change >= 0 ? "text-primary" : "text-destructive"}`}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Top Gainers */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Top Gainers</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {topGainers.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock)}
                  className="p-3 bg-card rounded-xl text-center active:bg-secondary transition-colors"
                >
                  <p className="font-bold text-foreground">{stock.symbol}</p>
                  <p className="text-sm text-primary font-medium">+{stock.changePercent.toFixed(2)}%</p>
                </button>
              ))}
            </div>
          </section>

          {/* Top Losers */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-destructive" />
              <h2 className="text-lg font-semibold text-foreground">Top Losers</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {topLosers.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock)}
                  className="p-3 bg-card rounded-xl text-center active:bg-secondary transition-colors"
                >
                  <p className="font-bold text-foreground">{stock.symbol}</p>
                  <p className="text-sm text-destructive font-medium">{stock.changePercent.toFixed(2)}%</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
