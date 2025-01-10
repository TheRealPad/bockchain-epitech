"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NFTSellOffers() {
  const [nftId, setNftId] = useState("")
  const [offers, setOffers] = useState([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to retrieve NFT sell offers
    console.log("Retrieving sell offers for NFT:", nftId)
    // Mock data
    setOffers([
      { id: '1', price: '0.5 ETH', seller: '0x123...' },
      { id: '2', price: '0.7 ETH', seller: '0x456...' },
    ])
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">NFT Sell Offers</h1>
      <Card className="max-w-md mb-6">
        <CardHeader>
          <CardTitle>Retrieve Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="NFT ID"
              value={nftId}
              onChange={(e) => setNftId(e.target.value)}
              required
            />
            <Button type="submit">Retrieve Offers</Button>
          </form>
        </CardContent>
      </Card>
      {offers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer: any) => (
            <Card key={offer.id}>
              <CardHeader>
                <CardTitle>Offer {offer.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Price: {offer.price}</p>
                <p>Seller: {offer.seller}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

