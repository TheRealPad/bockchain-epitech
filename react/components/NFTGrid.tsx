"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, HeartIcon, ShoppingCart, Tag } from "lucide-react";
import pokemon1 from "../public/pokemon1.png";
import pokemon2 from "../public/pokemon2.png";
import pokemon3 from "../public/pokemon3.png";
import { Button } from "./ui/button";
import apiClient, { NFT } from "@/app/apiClient";
import CreateSellOfferModal from "./CreateSellOfferModal";
import { useEffect, useState } from "react";

type Props = {
  nfts: NFT[];
};

export default function NFTGrid({ nfts }: Props) {
  const [createSellOfferOpen, setCreateSellOfferOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <Card key={nft.card_number} className="relative overflow-hidden group">
          <CardHeader className="p-0">
            <div className="relative">
              <Image
                src={nft.image}
                width={660}
                height={920}
                alt={nft.name}
                className="w-full h-auto transition-transform duration-300"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            <CardTitle className="text-lg font-semibold mb-2">
              {nft.name}
            </CardTitle>
            <Badge variant="secondary" className="2">
              {nft.rarity}
            </Badge>
          </CardContent>
        </Card>
      ))}
      <CreateSellOfferModal
        open={createSellOfferOpen}
        onClose={() => setCreateSellOfferOpen(false)}
      />
    </div>
  );
}
