import { AcceptBrokerOffer } from "./wallet-ui/accept-broker-offer";
import { TokenOffers } from "./wallet-ui/token-offers";
import { WalletBalance } from "./wallet-ui/wallet-balance";
import { WalletInfo } from "./wallet-ui/wallet-info";

export function BrokerWallet() {
  return (
    <div className="Wallet">
      <div className="WalletRow header">Broker Wallet</div>
      <WalletInfo />
      <WalletBalance />
      <TokenOffers />
      <AcceptBrokerOffer />
    </div>
  );
}
