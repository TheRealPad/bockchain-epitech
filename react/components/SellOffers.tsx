import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShoppingCart,
  DollarSign,
  Wallet,
  Check,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

async function fetchSellOffers() {
  // This is a placeholder. In a real application, you would fetch sell offers from your backend or blockchain
  return [
    { id: "1", nftName: "Trioxhydre ex", seller: "0x1234...5678", price: 0.5 },
    { id: "2", nftName: "Triopikeur", seller: "0x8765...4321", price: 1.2 },
    { id: "3", nftName: "Dracaufeu ex", seller: "0x2468...1357", price: 2.0 },
  ];
}

export default async function SellOffers() {
  const sellOffers = await fetchSellOffers();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Active Sell Offers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NFT</TableHead>
              <TableHead>Price (ETH)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.nftName}</TableCell>
                <TableCell>{offer.price}</TableCell>
                <TableCell>
                  <Button size="sm">
                    <DollarSign className="h-4 w-4" />
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
