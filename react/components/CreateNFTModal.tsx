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
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import apiClient, { NFT } from "@/app/apiClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  setNfts: (value: SetStateAction<NFT[]>) => void;
  open: boolean;
  onClose: () => void;
};

export default function CreateNFTModal({ setNfts, open, onClose }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rarity, setRarity] = useState("common");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // apiClient.createNFT()
    console.log("Creating NFT:", { name, description, image, rarity });

    const newNft = {
      card_number: "1",
      description,
      edition: "",
      image,
      name,
      rarity,
      type: "",
    };
    setNfts((prevNfts) => [...prevNfts, newNft]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New NFT</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 mb-4">
            <Label htmlFor="nft-name">NFT Name</Label>
            <Input
              id="nft-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="nft-description">Description (optional)</Label>
            <Textarea
              id="nft-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="nft-url">NFT Image URL</Label>
            <Input
              id="nft-url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="nft-rarity">Rarity</Label>
            <Select value={rarity} onValueChange={setRarity}>
              <SelectTrigger id="nft-rarity" className="w-full">
                <SelectValue placeholder="Select rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Common">Common</SelectItem>
                <SelectItem value="Rare">Rare</SelectItem>
                <SelectItem value="Ultra Rare">Ultra Rare</SelectItem>
                <SelectItem value="Legendary">Legendary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full mt-4">
            <PlusCircle className="h-4 w-4" />
            Create NFT
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
