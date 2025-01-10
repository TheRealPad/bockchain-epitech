"use client";

import Header from "@/components/Header";
import NFTGrid from "@/components/NFTGrid";
import SellOffers from "@/components/SellOffers";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { NFT, SellOffer } from "./apiClient";
import apiClient from "./apiClient";

async function fetchNFTs() {
  // const res = await apiClient.getWalletNFTs(
  //   "rKNJhhy5iBin6tmWpKMEFF7wFySZTL78hT",
  // );

  // console.log(res);
  // const nfts: NFT[] = res.map((item) => JSON.parse(item.decoded_uri));
  // console.log(nfts);
  // return nfts;

  // console.log(nfts);
  return [
    {
      card_number: "1",
      description: "",
      edition: "1st",
      name: "Trioxhydre ex",
      image:
        "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_36-2x.png",
      rarity: "Legendary",
      type: "Fire",
    },
    {
      card_number: "2",
      description: "",
      edition: "1st",
      name: "Topiqueur",
      image:
        "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_31-2x.png",
      rarity: "Common",
      type: "Earth",
    },
    {
      card_number: "3",
      description: "",
      edition: "1st",
      name: "Drakaufeu ex",
      image:
        "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_208-2x.png",
      rarity: "Rare",
      type: "Fire",
    },
  ];
}

async function fetchSellOffers() {
  // This is a placeholder. In a real application, you would fetch sell offers from your backend or blockchain
  return [
    { id: "1", nftName: "Trioxhydre ex", seller: "0x1234...5678", price: 0.5 },
    { id: "2", nftName: "Triopikeur", seller: "0x8765...4321", price: 1.2 },
    { id: "3", nftName: "Dracaufeu ex", seller: "0x2468...1357", price: 2.0 },
  ];
}

export default function Dashboard() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [sellOffers, setSellOffers] = useState<SellOffer[]>([]);

  useEffect(() => {
    async function fetchData() {
      const dataNft = await fetchNFTs();
      const dataOffer = await fetchSellOffers();
      setNfts(dataNft);
      setSellOffers(dataOffer);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header setNfts={setNfts} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex mb-8 items-center">
          <Wallet size={40} />
          <h1 className="ml-2 text-4xl font-bold  text-foreground">Wallet</h1>

          <h1 className="ml-5 font-bold">id: &lt;</h1>
          <div className="group relative rounded-md w-fit">
            <h1 className="blur-sm bg-black hover:blur-none font-bold inset-0 duration-300">
              rKNJhhy5iBin6tmWpKMEFF7wFySZTL78hT
            </h1>
          </div>

          <h1 className="font-bold">&gt;</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <NFTGrid nfts={nfts} />
          </div>
          <div className="space-y-8">
            <SellOffers sellOffers={sellOffers} />
          </div>
        </div>
      </main>
    </div>
  );
}
