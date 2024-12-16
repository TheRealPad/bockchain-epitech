import { useState } from "react";
import { useCreateSellOffer } from "@nice-xrpl/react-xrpl";

export function SellNFT() {
  // The useCreateSellOffer hook can be used to create a sell offer
  // for a token.  It requires an NFT ID, an price for the token,
  // and optionally a destination account.  If the destination account
  // is specified, only that account can accept the offer.  This is
  // the method used to transfer a token to another account.  First
  // create the sell offer and set the destination account.  Then the
  // other account can accept the sell offer using the offer index.
  // This is a transactional hook and requires a
  // wallet.
  const createSellOffer = useCreateSellOffer();
  const [tokenId, setTokenId] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <div className="WalletRow">
      Create a Sell offer for NFT with ID{" "}
      <input
        value={tokenId}
        onChange={(e) => setTokenId(e.currentTarget.value)}
      />{" "}
      for{" "}
      <input
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />{" "}
      XRP (drops) for broker account{" "}
      <input
        value={destination}
        onChange={(e) => setDestination(e.currentTarget.value)}
      />{" "}
      ) -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          disabled={!(tokenId && amount && destination)}
          onClick={async () => {
            setSending(true);
            try {
              const result = await createSellOffer(tokenId, amount, {
                destination,
              });

              console.log("UI: ", result);
            } catch (err) {
              // console.log("ERROR: ", err);
            } finally {
              setSending(false);
              setTokenId("");
              setAmount("");
              setDestination("");
            }
          }}
        >
          Send
        </button>
      )}
    </div>
  );
}
