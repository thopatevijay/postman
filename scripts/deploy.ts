import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  
  // Deploying the LetterStore contract
  const LetterStore = await ethers.getContractFactory("LetterStore");
  const letterStore = await LetterStore.connect(deployer).deploy();
  
  await letterStore.deployed();

  console.log(`LetterStore deployed to: ${letterStore.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
