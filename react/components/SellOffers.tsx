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
import { SellOffer } from "@/app/apiClient";

interface Props {
  sellOffers: SellOffer[];
}

export default function SellOffers({ sellOffers }: Props) {
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
