"use client";

import { useState } from "react";
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
import { DollarSign, Tag } from "lucide-react";

export default function CreateSellOfferModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedNFT, setSelectedNFT] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the sell offer creation logic
    console.log("Creating sell offer:", { selectedNFT, price });
    onClose();
  };

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
                <SelectItem value="nft1">Cool NFT #1</SelectItem>
                <SelectItem value="nft2">Awesome NFT #2</SelectItem>
                <SelectItem value="nft3">Rare NFT #3</SelectItem>
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
