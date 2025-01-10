"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AcceptSellOffer() {
  const [offerId, setOfferId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to accept sell offer
    console.log("Accepting sell offer:", offerId)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Accept Sell Offer</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Accept Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Offer ID"
              value={offerId}
              onChange={(e) => setOfferId(e.target.value)}
              required
            />
            <Button type="submit">Accept Offer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

