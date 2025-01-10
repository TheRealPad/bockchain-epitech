"use client";

import { Suspense, useState } from "react";
import TopBar from "@/components/Header";
import NFTGrid from "@/components/NFTGrid";
import SellOffers from "@/components/SellOffers";
import Login from '@/components/Login';

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Stocke l'adresse du wallet après la connexion

  // Cette fonction sera appelée quand un utilisateur créera ou se connectera à un wallet
  const handleLogin = (walletAddress: string) => {
    setWalletAddress(walletAddress); // Mets à jour l'état avec l'adresse du wallet après un login réussi
  };

  return (
    <div>
      { !walletAddress ? (
        <Login login={handleLogin} />
      ) :
        <div className="min-h-screen bg-background">
          <TopBar />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-foreground">My Cards</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Suspense fallback={<div>Loading NFTs...</div>}>
                  <NFTGrid />
                </Suspense>
              </div>
              <div className="space-y-8">
                <Suspense fallback={<div>Loading sell offers...</div>}>
                  <SellOffers />
                </Suspense>
              </div>
            </div>
          </main>
        </div>
      }
    </div>
  );
}
