import { useState } from "react";
import { useAcceptBrokeredOffer } from "@nice-xrpl/react-xrpl";

export function AcceptBrokerOffer() {
  // The useAcceptBrokeredOffer hook can be used to broker
  // a sell offer and a buy offer for a token for a token
  // It takes an offer index which can be obtained
  // using the getSellOffer hook and the getBuyOffer hook.
  // The sell offer must have been created with the broker account
  // as the destination in order to broker an offer.
  // This is a transactional hook and requires a
  // wallet.
  const acceptBrokeredOffer = useAcceptBrokeredOffer();
  const [buyOfferIndex, setBuyOfferIndex] = useState("");
  const [sellOfferIndex, setSellOfferIndex] = useState("");
  const [fee, setFee] = useState(0);
  const [sending, setSending] = useState(false);

  return (
    <div className="WalletRow">
      Broker an offer with buy offer index{" "}
      <input
        value={buyOfferIndex}
        onChange={(e) => setBuyOfferIndex(e.currentTarget.value)}
      />{" "}
      and sell offer index{" "}
      <input
        value={sellOfferIndex}
        onChange={(e) => setSellOfferIndex(e.currentTarget.value)}
      />{" "}
      with a fee of{" "}
      <input value={fee} onChange={(e) => setFee(e.currentTarget.value)} /> XRP
      (drops) -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          onClick={async () => {
            setSending(true);
            try {
              const result = await acceptBrokeredOffer(
                buyOfferIndex,
                sellOfferIndex,
                fee
              );

              console.log("UI: ", result);
            } catch (err) {
              // console.log("ERROR: ", err);
            } finally {
              setSending(false);
              setBuyOfferIndex("");
              setFee(0);
              setSellOfferIndex("");
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
