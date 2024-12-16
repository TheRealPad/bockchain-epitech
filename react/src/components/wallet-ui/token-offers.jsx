import { useState } from "react";
import { useGetBuyOffers, useGetSellOffers } from "@nice-xrpl/react-xrpl";
import { Offers } from "./offers";

export function TokenOffers() {
  const [buyOffers, setBuyOffers] = useState([]);
  const [sellOffers, setSellOffers] = useState([]);
  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [nftId, setNftId] = useState("");

  const getBuyOffers = useGetBuyOffers();
  const getSellOffers = useGetSellOffers();

  return (
    <div className="WalletRow">
      Offers for NFT ID:{" "}
      <input
        type="text"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
      />{" "}
      <button
        onClick={async () => {
          if (buyLoading || sellLoading) {
            return;
          }

          setBuyLoading(true);

          try {
            const buyOffers = await getBuyOffers(nftId);
            setBuyOffers(buyOffers);
          } catch (e) {
            // console.log(e);
          } finally {
            setBuyLoading(false);
          }

          try {
            const sellOffers = await getSellOffers(nftId);
            setSellOffers(sellOffers);
          } catch (e) {
            // console.log(e);
          } finally {
            setSellLoading(false);
          }
        }}
      >
        {buyLoading ? "Waiting for response..." : "Get Offers"}
      </button>
      {buyOffers.length || sellOffers.length ? (
        <Offers key={nftId} tokenId={nftId} />
      ) : null}
    </div>
  );
}
