"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateWallet() {
  const [walletName, setWalletName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to create wallet
    console.log("Creating wallet:", walletName)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Wallet</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>New Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Wallet Name"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              required
            />
            <Button type="submit">Create Wallet</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

