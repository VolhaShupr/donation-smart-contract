import { task } from "hardhat/config";
import { abi } from "../artifacts/contracts/Donation.sol/Donation.json";

task("getContributors", "Get list of all contributors")
  .addParam("contractaddr", "The contract address")
  .setAction(async ({ contractaddr: contractAddress }, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const donation = new hre.ethers.Contract(contractAddress, abi, signer);
    const contributors = await donation.getContributors();

    console.log(`Contributors:`);
    for (const contributor of contributors) {
      console.log(contributor);
    }
  });
