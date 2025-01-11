"use client";

import Header from "@/components/Header";
import { Suspense, useEffect, useState } from "react";
import TopBar from "@/components/Header";
import NFTGrid from "@/components/NFTGrid";
import SellOffers from "@/components/SellOffers";
import Login from "@/components/Login";
import { Wallet } from "lucide-react";
import { NFT, SellOffer } from "./apiClient";
import apiClient from "./apiClient";

async function fetchNFTs(wallet: string) {
  // const res = await apiClient.getWalletNFTs(wallet);
  //
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
      name: "Malvalame ex",
      image:
        "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_36-2x.png",
      rarity: "Legendary",
      type: "Fire",
    },
    {
      card_number: "2",
      description: "",
      edition: "1st",
      name: "Flamigator",
      image:
        "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_31-2x.png",
      rarity: "Common",
      type: "Earth",
    },
    {
      card_number: "3",
      description: "",
      edition: "1st",
      name: "Triopikeur",
      image:
        "https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_208-2x.png",
      rarity: "Ultra Rare",
      type: "Fire",
    },
  ];
}

async function fetchSellOffers() {
  // This is a placeholder. In a real application, you would fetch sell offers from your backend or blockchain
  return [
    { id: "2", nftName: "Malosse", seller: "rrhE...kydc", price: 0.2 },
    { id: "3", nftName: "Dracaufeu ex", seller: "rNjG...EBUP", price: 4.5 },
  ];
}

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Stocke l'adresse du wallet après la connexion
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [sellOffers, setSellOffers] = useState<SellOffer[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!walletAddress) return;
      const dataNft = await fetchNFTs(walletAddress);
      const dataOffer = await fetchSellOffers();
      setNfts(dataNft);
      setSellOffers(dataOffer);
    }
    fetchData();
  }, [walletAddress]);

  // Cette fonction sera appelée quand un utilisateur créera ou se connectera à un wallet
  const handleLogin = (walletAddress: string) => {
    setWalletAddress(walletAddress); // Mets à jour l'état avec l'adresse du wallet après un login réussi
  };

  return (
    <div>
      {!walletAddress ? (
        <Login login={handleLogin} />
      ) : (
        <div className="min-h-screen bg-background">
          <Header
            wallet={walletAddress}
            nfts={nfts}
            setNfts={setNfts}
            sellOffers={sellOffers}
            setSellOffers={setSellOffers}
          />
          <main className="container mx-auto px-4 py-8">
            <div className="flex mb-8 items-center">
              <Wallet size={40} />
              <h1 className="ml-2 text-4xl font-bold  text-foreground">
                Wallet
              </h1>

              <h1 className="ml-5 font-bold">adresse: &lt;</h1>
              <div className="group relative rounded-md w-fit">
                <h1 className="blur-sm bg-black hover:blur-none font-bold inset-0 duration-300">
                  {walletAddress}
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
      )}
    </div>
  );
}
