"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MintNFT() {
  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    image: "",
    walletId: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to mint NFT
    console.log("Minting NFT:", nftData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNftData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mint NFT</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>New NFT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="NFT Name"
              value={nftData.name}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="NFT Description"
              value={nftData.description}
              onChange={handleChange}
              required
            />
            <Input
              name="image"
              placeholder="Image URL"
              value={nftData.image}
              onChange={handleChange}
              required
            />
            <Input
              name="walletId"
              placeholder="Wallet ID"
              value={nftData.walletId}
              onChange={handleChange}
              required
            />
            <Button type="submit">Mint NFT</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

