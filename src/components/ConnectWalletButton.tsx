import { useConnectWallet } from "@web3-onboard/react";
import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";

interface Account {
  address: string;
}

const ConnectWalletButton: React.FC = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (wallet?.provider) {
      setAccount({
        address: wallet.accounts[0].address,
      });
    }
  }, [wallet]);

  const handleConnectClick = async () => {
    try {
      const walletStates = await connect();
      console.log('Connected wallets:', walletStates);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <button
      className={`flex items-center px-4 py-2 text-white rounded-full shadow-md transition-colors duration-300 ${
        account?.address ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
      }`}
      disabled={!!connecting || !!wallet?.provider}
      onClick={handleConnectClick}
    >
      <FaWallet className="w-5 h-5 mr-2" />
      {account?.address ? "Wallet Connected" : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletButton;
