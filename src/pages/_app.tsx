import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import { onboardConfig } from "../utils/connectWallet";

const wen3Onboard = init({
  connect: {
    autoConnectAllPreviousWallet: true,
  },
  ...onboardConfig,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3OnboardProvider web3Onboard={wen3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
  );
}
