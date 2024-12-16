import { useState } from "react";
import { useBurnToken, useGetTokens } from "@nice-xrpl/react-xrpl";

export function BurnNFT() {
  // The useBurnToken hook can be used to burn
  // an NFT.
  // This is a transactional hook and requires a
  // wallet.
  const burnToken = useBurnToken();
  const [id, setId] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <div className="WalletRow">
      Burn an NFT by ID:{" "}
      <input value={id} onChange={(e) => setId(e.currentTarget.value)} /> -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          onClick={async () => {
            setSending(true);
            const result = await burnToken(id);
            console.log("UI: ", result);
            setSending(false);
            setId("");
          }}
          disabled={!id}
        >
          Send
        </button>
      )}
    </div>
  );
}
