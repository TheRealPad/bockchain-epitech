import { AcceptSellOffer } from "./wallet-ui/accept-sell-offer";
import { BuyNFT } from "./wallet-ui/buy-nft";
import { ShowNFTs } from "./wallet-ui/tokens/show-nfts";
import { WalletBalance } from "./wallet-ui/wallet-balance";
import { WalletInfo } from "./wallet-ui/wallet-info";

export function DestinationWallet() {
  return (
    <div className="Wallet">
      <div className="WalletRow header">Destination Wallet</div>
      <WalletInfo />
      <WalletBalance />
      <ShowNFTs />
      <BuyNFT />
    </div>
  );
}
