import { useBuyOffers, useSellOffers } from "@nice-xrpl/react-xrpl";

export function Offers({ tokenId }) {
  const buyOffers = useBuyOffers(tokenId);
  const sellOffers = useSellOffers(tokenId);

  return (
    <>
      {buyOffers?.length ? (
        <div>
          Buy Offers
          <ul>
            {buyOffers.map((offer) => {
              return (
                <li key={offer.index}>
                  Offer Index <code>{offer.index}</code> for offer amount{" "}
                  {offer.amount}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {sellOffers?.length ? (
        <div>
          Sell Offers
          <ul>
            {sellOffers.map((offer) => {
              return (
                <li key={offer.index}>
                  Offer Index <code>{offer.index}</code> for offer amount{" "}
                  {offer.amount}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
