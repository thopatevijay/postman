import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  defaultNetwork: 'mode',
  solidity: "0.8.17",
  networks: {
    mode: {
      url: 'https://sepolia.mode.network/',
      chainId: 919,
      accounts: [process.env.PRIVATE_KEY]
    },
    ganache: {
      url: 'http://localhost:8545',
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};

export default config;
