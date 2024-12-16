import { useCreateWallet, Wallet } from "@nice-xrpl/react-xrpl";
import { useEffect, useRef, useState } from "react";

export function LoadWallet({ children, loginSeed }) {
  const [seed, setSeed] = useState("");
  const creating = useRef(false);

  // When connected to the testnet/dev net, you can
  // use the useCreateWallet series of hooks to create
  // a wallet and fund it from the faucet.
  const createWallet = useCreateWallet();

  useEffect(() => {
    if (!creating.current) {
      creating.current = true;
      createWallet("500")
        .then((initialState) => {
          setSeed(initialState.wallet.seed);
        })
        .finally(() => {
          creating.current = false;
        });
    }
  }, [createWallet]);

  return seed ? (
    <Wallet
      seed={loginSeed ? loginSeed : seed}
      fallback={<div>Loading wallet...</div>}
    >
      {children}
    </Wallet>
  ) : (
    <div>Loading wallet...</div>
  );
}
