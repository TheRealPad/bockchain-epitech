import { MintNFT } from "./wallet-ui/mint-nft";
import { SellNFT } from "./wallet-ui/sell-nft";
import { ShowNFTs } from "./wallet-ui/tokens/show-nfts";
import { WalletBalance } from "./wallet-ui/wallet-balance";
import { WalletInfo } from "./wallet-ui/wallet-info";
import { BuyNFT } from "./wallet-ui/buy-nft";
import { TokenOffers } from "./wallet-ui/token-offers";
import { AcceptBrokerOffer } from "./wallet-ui/accept-broker-offer";

export function SourceWallet() {
  return (
    <div className="Wallet">
      <div className="WalletRow header">Source Wallet</div>
      <WalletInfo />
      <WalletBalance />
      <MintNFT />
      <ShowNFTs />
      <SellNFT />
      <BuyNFT />
      <TokenOffers />
      <AcceptBrokerOffer />
    </div>
  );
}
