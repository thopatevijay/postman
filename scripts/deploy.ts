import { ethers } from "hardhat";
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Deploying the LetterStore contract
  const LetterStore = await ethers.getContractFactory("LetterStore");
  const letterStore = await LetterStore.connect(deployer).deploy();

  await letterStore.deployed();
  console.log(`LetterStore deployed to: ${letterStore.address}`);

  let deployedDetails = {
    CONTRACT_NAME: "LetterStore",
    CONTRACT_ADDRESS: letterStore.address,
    DEPLOYER_ADDRESS: deployer.address,
    ABI: JSON.parse(letterStore.interface.format("json").toString())
  }

  fs.writeFile("./contract-details.json", JSON.stringify(deployedDetails, null, 2), (err: any) => {
    if (err) {
      return console.log(err);
    }
    return console.log("The file was saved!");
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
