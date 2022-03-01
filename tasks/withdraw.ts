import { task } from "hardhat/config";
import { abi } from "../artifacts/contracts/Donation.sol/Donation.json";

task("withdraw", "Withdraw from contract to address")
  .addParam("contractaddr", "The contract address")
  .addParam("amount", "The ether amount to withdraw")
  .addParam("recipient", "The recipient address")
  .setAction(async ({ contractaddr: contractAddress, amount, recipient }, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const etherAmount = hre.ethers.utils.parseEther(amount);

    const donation = new hre.ethers.Contract(contractAddress, abi, signer);
    await donation.withdrawToAddress(recipient, etherAmount);

    console.log(`Transferred from contract ${contractAddress} to address ${recipient} in amount of ${amount} ETH`);
  });
