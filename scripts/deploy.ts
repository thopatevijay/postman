import { ethers } from "hardhat";
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Deploying the LetterFeeCollector contract
  const LetterFeeCollector = await ethers.getContractFactory("LetterFeeCollector");
  const letterFeeCollector = await LetterFeeCollector.connect(deployer).deploy();

  await letterFeeCollector.deployed();
  console.log(`LetterFeeCollector deployed to: ${letterFeeCollector.address}`);

  let deployedDetails = {
    CONTRACT_NAME: "LetterFeeCollector",
    CONTRACT_ADDRESS: letterFeeCollector.address,
    DEPLOYER_ADDRESS: deployer.address,
    ABI: JSON.parse(letterFeeCollector.interface.format("json").toString())
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
