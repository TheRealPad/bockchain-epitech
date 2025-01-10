import Header from "@/components/Header";
import NFTGrid from "@/components/NFTGrid";
import SellOffers from "@/components/SellOffers";
import { Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
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
            <NFTGrid />
          </div>
          <div className="space-y-8">
            <SellOffers />
          </div>
        </div>
      </main>
    </div>
  );
}
