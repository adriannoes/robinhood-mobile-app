"use client"

interface TimeRangeTabsProps {
  selected: string
  onSelect: (range: string) => void
}

const ranges = ["1D", "1W", "1M", "3M", "1Y", "ALL"]

export function TimeRangeTabs({ selected, onSelect }: TimeRangeTabsProps) {
  return (
    <div className="flex justify-between px-4 py-4">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onSelect(range)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  )
}
