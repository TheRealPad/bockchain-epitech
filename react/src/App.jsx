import { Networks, useIsConnected, XRPLClient } from "@nice-xrpl/react-xrpl";
import { BrokerWallet } from "./components/broker-wallet";
import { DestinationWallet } from "./components/destination-wallet";
import { LoadWallet } from "./components/load-wallet";
import { SourceWallet } from "./components/source-wallet";
import "./styles.css";
import { Login } from "./components/auth/login";
import { useState } from "react";

function MainApp() {
  // The useIsConnected hook will let you know
  // when the client has connected to the xrpl network
  const isConnected = useIsConnected();
  const [seed, setSeed] = useState("");
  const [hasLogin, setHasLogin] = useState(false);

  const createNewWallet = () => {
    setHasLogin(true);
  };

  const login = (seed: string) => {
    setSeed(seed);
    setHasLogin(true);
  };

  return (
    <div className="MainApp">
      <div>Connected: {isConnected ? "Yes" : "No"}</div>
      {!hasLogin ? (
        <Login login={login} createNewWallet={createNewWallet} />
      ) : (
        <LoadWallet loginSeed={seed}>
          <SourceWallet />
        </LoadWallet>
        // <div>
        //   <div className="WalletWrapper">
        //     <LoadWallet>
        //       <SourceWallet />
        //     </LoadWallet>
        //   </div>
        //   <div className="WalletWrapper">
        //     <LoadWallet>
        //       <BrokerWallet />
        //     </LoadWallet>
        //   </div>
        //   <div className="WalletWrapper">
        //     <LoadWallet>
        //       <DestinationWallet />
        //     </LoadWallet>
        //   </div>
        // </div>
      )}
      {/*<div className="WalletWrapper">*/}
      {/*  <LoadWallet>*/}
      {/*    <SourceWallet />*/}
      {/*  </LoadWallet>*/}
      {/*</div>*/}
      {/*<div className="WalletWrapper">*/}
      {/*  <LoadWallet>*/}
      {/*    <BrokerWallet />*/}
      {/*  </LoadWallet>*/}
      {/*</div>*/}
      {/*<div className="WalletWrapper">*/}
      {/*  <LoadWallet>*/}
      {/*    <DestinationWallet />*/}
      {/*  </LoadWallet>*/}
      {/*</div>*/}
    </div>
  );
}

// The main application.  Wrap it with XRPLClient to
// create a connection to the xrpl network!
// All of the hooks require a client somewhere above
// them in the tree.
export default function App() {
  return (
    <div className="App">
      <XRPLClient network={Networks.Testnet}>
        <MainApp />
      </XRPLClient>
    </div>
  );
}
