"use client";

import { SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag } from "lucide-react";
import { NFT, SellOffer } from "@/app/apiClient";

export default function CreateSellOfferModal({
  wallet,
  nfts,
  setSellOffers,
  open,
  onClose,
}: {
  wallet: string;
  nfts: NFT[];
  setSellOffers: (value: SetStateAction<SellOffer[]>) => void;
  open: boolean;
  onClose: () => void;
}) {
  const [selectedNFT, setSelectedNFT] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the sell offer creation logic
    console.log("Creating sell offer:", { selectedNFT, price });
    const croppedWallet = wallet.slice(0, 4) + "..." + wallet.slice(-4);
    const newOffer = {
      id: "",
      nftName: selectedNFT,
      seller: croppedWallet,
      price: Number(price),
    };

    setSellOffers((prevOffers) => [...prevOffers, newOffer]);

    onClose();
  };

  if (!nfts) return;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Sell Offer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nft-select">Select NFT</Label>
            <Select onValueChange={setSelectedNFT} required>
              <SelectTrigger>
                <SelectValue placeholder="Select an NFT" />
              </SelectTrigger>
              <SelectContent>
                {nfts.map((nft, index) => (
                  <SelectItem key={index} value={nft.name}>
                    {nft.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (ETH)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Tag className="mr-2 h-4 w-4" />
            Create Sell Offer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
