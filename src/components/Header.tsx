import React from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import { FaWallet } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white shadow-md">
      <div className="flex items-center space-x-2">
        <FaWallet className="w-6 h-6" />
        <span className="text-xl font-bold">Postman</span>
      </div>
      <ConnectWalletButton />
    </div>
  );
};

export default Header;
