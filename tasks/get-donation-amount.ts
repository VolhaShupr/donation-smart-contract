import { task } from "hardhat/config";
import { abi } from "../artifacts/contracts/Donation.sol/Donation.json";

task("getDonationAmount", "Get contributor donation value")
  .addParam("contractaddr", "The contract address")
  .addParam("contributoraddr", "The contributor address")
  .setAction(async ({contractaddr: contractAddress, contributoraddr: contributorAddress}, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const donation = new hre.ethers.Contract(contractAddress, abi, signer);
    const donationAmount = await donation.getContributorDonation(contributorAddress);
    const etherAmount = hre.ethers.utils.formatEther(donationAmount);

    console.log(`Address ${contractAddress} donated ${etherAmount} ETH`);
  });
