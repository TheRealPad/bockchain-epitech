import { useWallet } from "@nice-xrpl/react-xrpl";

export function WalletInfo() {
  // The useWalletAddress hook gives you the address
  // of the wallet used up in the tree.
  const wallet = useWallet();

  return (
    <div className="WalletRow">
      <p>
        Address: <code>{wallet.address}</code>
      </p>
      <p>
        Seed: <code>{wallet.seed}</code>
      </p>
    </div>
  );
}
