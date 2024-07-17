import React from "react";
import { FaWallet } from "react-icons/fa";

const ConnectWalletButton: React.FC = () => {
  return (
    <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
      <FaWallet className="w-5 h-5 mr-2" />
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
