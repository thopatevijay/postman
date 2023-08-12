import WalletProvider from '../common/WalletProvider';
import '../styles/globals.css'
import { MetaMaskProvider } from "metamask-react";

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </MetaMaskProvider>
  )
}

export default MyApp
