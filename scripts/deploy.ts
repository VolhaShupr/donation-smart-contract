import { ethers } from "hardhat";

async function main() {
  const donationContractFactory = await ethers.getContractFactory("Donation");
  const donationContract = await donationContractFactory.deploy();

  await donationContract.deployed();

  console.log("Donation deployed to:", donationContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
