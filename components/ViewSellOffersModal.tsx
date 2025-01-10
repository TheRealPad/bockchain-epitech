"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, ShoppingCart } from "lucide-react";

interface SellOffer {
  id: string;
  nftName: string;
  seller: string;
  price: number;
}

export default function ViewSellOffersModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [sellOffers, setSellOffers] = useState<SellOffer[]>([]);

  useEffect(() => {
    // This is a placeholder. In a real application, you would fetch sell offers from your backend or blockchain
    const mockSellOffers: SellOffer[] = [
      { id: "1", nftName: "Cool NFT #1", seller: "0x1234...5678", price: 0.5 },
      {
        id: "2",
        nftName: "Awesome NFT #2",
        seller: "0x8765...4321",
        price: 1.2,
      },
      { id: "3", nftName: "Rare NFT #3", seller: "0x2468...1357", price: 2.0 },
    ];
    setSellOffers(mockSellOffers);
  }, []);

  const handleAcceptOffer = (offerId: string) => {
    // Here you would handle the logic to accept a sell offer
    console.log("Accepting offer:", offerId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>View Sell Offers</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NFT Name</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price (ETH)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.nftName}</TableCell>
                <TableCell>{offer.seller}</TableCell>
                <TableCell>{offer.price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAcceptOffer(offer.id)} size="sm">
                    <DollarSign className="h-4 w-4" />
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
