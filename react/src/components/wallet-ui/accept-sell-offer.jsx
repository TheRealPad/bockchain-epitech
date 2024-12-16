import { useState } from "react";
import { useAcceptSellOffer } from "@nice-xrpl/react-xrpl";

export function AcceptSellOffer() {
  // The useAcceptSellOffer hook can be used to accept a sell offer
  // for a token.  It takes an offer index which can be obtained
  // using the getSellOffer hook.
  // This is a transactional hook and requires a
  // wallet.
  const acceptSellOffer = useAcceptSellOffer();
  const [offerIndex, setOfferIndex] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <div className="WalletRow">
      Accept a sell offer with index{" "}
      <input
        value={offerIndex}
        onChange={(e) => setOfferIndex(e.currentTarget.value)}
      />{" "}
      -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          onClick={async () => {
            setSending(true);
            try {
              const result = await acceptSellOffer(offerIndex);

              console.log("UI: ", result);
            } catch (err) {
              // console.log("ERROR: ", err);
            } finally {
              setSending(false);
              setOfferIndex("");
            }

            // const tokens = await getTokens();
            // console.log('UI: ', tokens);
          }}
        >
          Send
        </button>
      )}
    </div>
  );
}
