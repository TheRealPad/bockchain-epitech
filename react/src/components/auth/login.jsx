import { useState } from "react";
import './login.css';

interface Props {
  login(seed: string): void;
  createNewWallet(): void;
}

function Login({ login, createNewWallet }: Props) {
  const [seed, setSeed] = useState("");

  return (
    <div>
      <div className="background"/>
      <div className="container">
        <label>
          Welcome to Pokemon TCG Bockchain
        </label>
        <form onSubmit={() => login(seed)}>
          <input
            onInput={(e) => setSeed(e.target.value)}
            placeholder={"Please enter your wallet seed"}
          />
        </form>
        <button type={"submit"}>login</button>
        <button className="create-wallet" onClick={createNewWallet}>create new wallet</button>
        </div>
      </div>
  );
}

export { Login };

