import { useState } from "react";

interface Props {
  login(seed: string): void;
  createNewWallet(): void;
}

function Login({ login, createNewWallet }: Props) {
  const [seed, setSeed] = useState("");

  return (
    <div>
      <form onSubmit={() => login(seed)}>
        <input
          onInput={(e) => setSeed(e.target.value)}
          placeholder={"Please enter your wallet seed"}
        />
        <button type={"submit"}>login</button>
      </form>
      <button onClick={createNewWallet}>create new wallet</button>
    </div>
  );
}

export { Login };
