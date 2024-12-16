import { useTokens } from "@nice-xrpl/react-xrpl";
import { Token } from "./token/token";

export function ShowNFTs() {
  // The useTokens hook gives you a list of all
  // tokens associated with an address.
  // This is a request hook, so it can be used with
  // a wallet or a wallet address.
  const tokens = useTokens();

  return (
    <div className="WalletRow">
      <strong>Tokens:</strong>{" "}
      <ul>
        {tokens.length
          ? tokens.map((token) => {
              return (
                <li key={token.id}>
                  <Token id={token.id} uri={token.uri} />
                </li>
              );
            })
          : "No tokens held"}
      </ul>
    </div>
  );
}
