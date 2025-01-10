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
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import apiClient from "@/app/apiClient";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateNFTModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // apiClient.createNFT()
    console.log("Creating NFT:", { name, description, file: imageUrl });
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
            <Label htmlFor="nft-description">Description</Label>
            <Textarea
              id="nft-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="nft-url">NFT Image URL</Label>
            <Input
              id="nft-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
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
