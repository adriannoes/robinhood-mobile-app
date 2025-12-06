"use client"

import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Building2, CreditCard, Clock, ChevronRight, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

type TransferType = "deposit" | "withdraw" | null

interface Transaction {
  id: string
  type: "deposit" | "withdraw"
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
  method: string
}

const recentTransactions: Transaction[] = [
  { id: "1", type: "deposit", amount: 500, date: "Dec 5, 2025", status: "completed", method: "Bank Transfer" },
  { id: "2", type: "withdraw", amount: 150, date: "Dec 3, 2025", status: "completed", method: "Instant" },
  { id: "3", type: "deposit", amount: 1000, date: "Nov 28, 2025", status: "completed", method: "Bank Transfer" },
  { id: "4", type: "deposit", amount: 250, date: "Nov 20, 2025", status: "completed", method: "Debit Card" },
  { id: "5", type: "withdraw", amount: 300, date: "Nov 15, 2025", status: "completed", method: "Bank Transfer" },
]

const linkedAccounts = [
  { id: "1", name: "Chase Checking", last4: "4521", type: "bank" },
  { id: "2", name: "Bank of America", last4: "8832", type: "bank" },
  { id: "3", name: "Visa Debit", last4: "1234", type: "card" },
]

interface TransferScreenProps {
  onBack: () => void
}

export function TransferScreen({ onBack }: TransferScreenProps) {
  const [transferType, setTransferType] = useState<TransferType>(null)
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState(linkedAccounts[0])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "")
    const parts = cleaned.split(".")
    if (parts.length > 2) return
    if (parts[1] && parts[1].length > 2) return
    setAmount(cleaned)
  }

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString())
  }

  const handleSubmit = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setTransferType(null)
      setAmount("")
    }, 2000)
  }

  // Success overlay
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {transferType === "deposit" ? "Deposit" : "Withdrawal"} Initiated
          </h2>
          <p className="text-muted-foreground">
            ${Number.parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {transferType === "deposit" ? "Funds will arrive in 1-3 business days" : "Funds will be sent shortly"}
          </p>
        </div>
      </div>
    )
  }

  // Deposit/Withdraw form
  if (transferType) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={() => setTransferType(null)} className="p-2 -ml-2">
            <X className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">
            {transferType === "deposit" ? "Deposit" : "Withdraw"}
          </h1>
          <div className="w-10" />
        </div>

        <div className="p-6">
          {/* Amount input */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-4xl font-light text-muted-foreground">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="text-5xl font-semibold bg-transparent border-none outline-none text-foreground text-center w-48"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {transferType === "deposit" ? "Available: Unlimited" : "Available: $5,284.32"}
            </p>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-3 mb-8">
            {[100, 250, 500, 1000].map((value) => (
              <button
                key={value}
                onClick={() => handleQuickAmount(value)}
                className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                ${value}
              </button>
            ))}
          </div>

          {/* Account selector */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">{transferType === "deposit" ? "From" : "To"}</p>
            <div className="space-y-2">
              {linkedAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => setSelectedAccount(account)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                    selectedAccount.id === account.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    {account.type === "bank" ? (
                      <Building2 className="w-5 h-5 text-foreground" />
                    ) : (
                      <CreditCard className="w-5 h-5 text-foreground" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{account.name}</p>
                    <p className="text-sm text-muted-foreground">••••{account.last4}</p>
                  </div>
                  {selectedAccount.id === account.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Transfer time info */}
          <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl mb-6">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {transferType === "deposit" ? "Standard Transfer" : "1-3 Business Days"}
              </p>
              <p className="text-xs text-muted-foreground">
                {transferType === "deposit" ? "Arrives in 1-3 business days • Free" : "No fee for standard withdrawals"}
              </p>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="fixed bottom-24 left-0 right-0 p-4 bg-background">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleSubmit}
              disabled={!amount || Number.parseFloat(amount) <= 0}
              className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {transferType === "deposit" ? "Deposit" : "Withdraw"}{" "}
              {amount && `$${Number.parseFloat(amount).toLocaleString()}`}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Main transfer screen
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-foreground mb-1">Transfer</h1>
        <p className="text-muted-foreground">Move money in or out of your account</p>
      </div>

      {/* Balance card */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Cash Available</p>
          <p className="text-3xl font-bold text-foreground">$5,284.32</p>
        </div>
      </div>

      {/* Transfer options */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTransferType("deposit")}
            className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary transition-colors"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
              <ArrowDownLeft className="w-7 h-7 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Deposit</span>
          </button>
          <button
            onClick={() => setTransferType("withdraw")}
            className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary transition-colors"
          >
            <div className="w-14 h-14 bg-destructive/20 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-7 h-7 text-destructive" />
            </div>
            <span className="font-semibold text-foreground">Withdraw</span>
          </button>
        </div>
      </div>

      {/* Linked accounts */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Linked Accounts</h2>
          <button className="text-sm text-primary font-medium">Add New</button>
        </div>
        <div className="space-y-3">
          {linkedAccounts.map((account) => (
            <div key={account.id} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                {account.type === "bank" ? (
                  <Building2 className="w-5 h-5 text-foreground" />
                ) : (
                  <CreditCard className="w-5 h-5 text-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{account.name}</p>
                <p className="text-sm text-muted-foreground">••••{account.last4}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="px-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === "deposit" ? "bg-primary/20" : "bg-destructive/20"
                }`}
              >
                {tx.type === "deposit" ? (
                  <ArrowDownLeft className={`w-5 h-5 text-primary`} />
                ) : (
                  <ArrowUpRight className={`w-5 h-5 text-destructive`} />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{tx.type === "deposit" ? "Deposit" : "Withdrawal"}</p>
                <p className="text-sm text-muted-foreground">
                  {tx.date} • {tx.method}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.type === "deposit" ? "text-primary" : "text-foreground"}`}>
                  {tx.type === "deposit" ? "+" : "-"}${tx.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
