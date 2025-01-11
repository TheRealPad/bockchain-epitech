"use client";

import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateNFTModal from "./CreateNFTModal";
import CreateSellOfferModal from "./CreateSellOfferModal";
import ViewSellOffersModal from "./ViewSellOffersModal";
import { PlusCircle, DollarSign, ShoppingBag, Tag, Layers } from "lucide-react";
import { NFT, SellOffer } from "@/app/apiClient";

type Props = {
  wallet: string;
  nfts: NFT[];
  setNfts: (value: SetStateAction<NFT[]>) => void;
  sellOffers: SellOffer[];
  setSellOffers: (value: SetStateAction<SellOffer[]>) => void;
};

export default function Header({
  wallet,
  nfts,
  setNfts,
  sellOffers,
  setSellOffers,
}: Props) {
  const [createNFTOpen, setCreateNFTOpen] = useState(false);
  const [createSellOfferOpen, setCreateSellOfferOpen] = useState(false);
  const [viewSellOffersOpen, setViewSellOffersOpen] = useState(false);

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Layers />
          <h1 className="text-xl font-bold text-foreground">NFT Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setCreateNFTOpen(true)}
            variant="outline"
            size="sm"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create NFT
          </Button>
          <Button
            onClick={() => setCreateSellOfferOpen(true)}
            variant="outline"
            size="sm"
          >
            <Tag className="mr-2 h-4 w-4" />
            Create Sell Offer
          </Button>
          <Button
            onClick={() => setViewSellOffersOpen(true)}
            variant="outline"
            size="sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            View Sell Offers
          </Button>
        </div>
      </div>
      <CreateNFTModal
        setNfts={setNfts}
        open={createNFTOpen}
        onClose={() => setCreateNFTOpen(false)}
      />
      <CreateSellOfferModal
        wallet={wallet}
        nfts={nfts}
        setSellOffers={setSellOffers}
        open={createSellOfferOpen}
        onClose={() => setCreateSellOfferOpen(false)}
      />
      <ViewSellOffersModal
        sellOffers={sellOffers}
        open={viewSellOffersOpen}
        onClose={() => setViewSellOffersOpen(false)}
      />
    </div>
  );
}
