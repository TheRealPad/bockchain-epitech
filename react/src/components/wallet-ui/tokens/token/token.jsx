import { useState } from "react";
import {
  useBuyOffers,
  useGetBuyOffers,
  useGetSellOffers,
  useSellOffers,
} from "@nice-xrpl/react-xrpl";
import { Offers } from "../../offers";
import type { Pokemon } from "../../../dto/pokemon";
import "./styles.css";

export function Token({ id, uri }) {
  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);

  // The useGetBuyOffers and useGetSellOffers hooks allow you to
  // retrieve any buy/sell offers for a token ID from the ledger.
  const getBuyOffers = useGetBuyOffers();
  const getSellOffers = useGetSellOffers();

  // The useBuyOffers and useSellOffers hooks reactively return
  // all offers.  These are updated as transactions are made.
  const buyOffers = useBuyOffers(id);
  const sellOffers = useSellOffers(id);
  const pokemon: Pokemon = JSON.parse(uri);

  return (
    <div className={"token"}>
      <code>{id}</code>
      {": "}
      <div className={"pokemon"}>
        <p>{pokemon.name}</p>
        <p>{pokemon.type}</p>
        <p>{pokemon.rarity}</p>
        <p>{pokemon.edition}</p>
        <p>{pokemon.description}</p>
        <p>{pokemon.card_number}</p>
      </div>
      <img className={"card"} src={pokemon.image} />
      {" - "}
      <button
        onClick={async () => {
          if (buyLoading || sellLoading) {
            return;
          }

          setBuyLoading(true);

          try {
            await getBuyOffers(id);
          } catch (e) {
            // console.log(e);
          } finally {
            setBuyLoading(false);
          }

          try {
            await getSellOffers(id);
          } catch (e) {
            // console.log(e);
          } finally {
            setSellLoading(false);
          }
        }}
      >
        {buyLoading ? "Waiting for response..." : "Get Offers"}
      </button>
      <Offers buyOffers={buyOffers} sellOffers={sellOffers} />
    </div>
  );
}
