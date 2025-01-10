"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateSellOffer() {
  const [offerData, setOfferData] = useState({
    nftId: "",
    price: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to create sell offer
    console.log("Creating sell offer:", offerData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOfferData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Sell Offer</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>New Sell Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="nftId"
              placeholder="NFT ID"
              value={offerData.nftId}
              onChange={handleChange}
              required
            />
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={offerData.price}
              onChange={handleChange}
              required
            />
            <Button type="submit">Create Offer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

