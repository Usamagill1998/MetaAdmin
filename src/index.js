/**
=========================================================
* Beta Magic React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import Web3 from "web3";
import { UseWalletProvider } from "use-wallet";
import WalletConnectProvider from "@walletconnect/web3-provider";
function getLibrary(provider, connector) {
  return new Web3(provider);
}
const options = new WalletConnectProvider({
  rpc: {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
});

// Beta Magic React Context Provider
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <UseWalletProvider
      autoConnect
      chainId={97}
      connectors={{
        // This is how connectors get configured
        walletconnect: options,
        portis: { dAppId: "my-dapp-id-123-xyz" },
      }}
    >
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </UseWalletProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
