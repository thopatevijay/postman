import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  defaultNetwork: 'ganache',
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: 'http://localhost:8545',
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};

export default config;
