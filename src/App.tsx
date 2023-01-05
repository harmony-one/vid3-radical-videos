import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Helmet } from "react-helmet";

import logo from "./logo.svg";
import VideoHome from "./routes/video-home";
import VideoReels from "./routes/video-reels";
import { config } from "./util/web3/config";
import "./App.css";

const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECTID!;

const chains = [config.chainParameters];
console.log(projectId)

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);
console.log('provider', { provider } );

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

console.log('client', { wagmiClient })
export const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>.s.country videos | Harmony</title>
          <meta name="description" content="Description" />
        </Helmet>
        <Routes>
          <Route path="/" element={<VideoHome />} />
          <Route path="/:vanityUrl" element={<VideoReels />} />
        </Routes>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </div>
  );
}

export default App;
