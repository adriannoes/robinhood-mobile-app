"use client"

import { useState } from "react"
import { PortfolioHeader } from "@/components/portfolio-header"
import { PortfolioChart } from "@/components/portfolio-chart"
import { TimeRangeTabs } from "@/components/time-range-tabs"
import { BuyingPower } from "@/components/buying-power"
import { WatchlistSection } from "@/components/watchlist-section"
import { BottomNav } from "@/components/bottom-nav"
import { StockDetail } from "@/components/stock-detail"
import { SearchScreen } from "@/components/search-screen"
import { TransferScreen } from "@/components/transfer-screen"

export type Stock = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  chartData: number[]
}

const watchlistData: Stock[] = [
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
]

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [timeRange, setTimeRange] = useState("1D")
  const [activeTab, setActiveTab] = useState("home")

  if (activeTab === "transfer") {
    return (
      <>
        <TransferScreen onBack={() => setActiveTab("home")} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </>
    )
  }

  if (activeTab === "search") {
    return (
      <>
        <SearchScreen
          stocks={watchlistData}
          onSelectStock={(stock) => {
            setSelectedStock(stock)
            setActiveTab("home")
          }}
          onBack={() => setActiveTab("home")}
        />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </>
    )
  }

  if (selectedStock) {
    return (
      <>
        <StockDetail stock={selectedStock} onBack={() => setSelectedStock(null)} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <PortfolioHeader />
        <PortfolioChart timeRange={timeRange} />
        <TimeRangeTabs selected={timeRange} onSelect={setTimeRange} />
        <BuyingPower />
        <WatchlistSection stocks={watchlistData} onSelectStock={setSelectedStock} />
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
