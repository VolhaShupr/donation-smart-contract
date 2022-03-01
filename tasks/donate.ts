import * as dotenv from "dotenv";
import { task } from "hardhat/config";
import { abi } from "../artifacts/contracts/Donation.sol/Donation.json";

dotenv.config();

task("donate", "Makes a donation")
  .addParam("contractaddr", "The contract address") // or should we hardcode the address?
  .addParam("amount", "The ether amount to donate")
  .addParam("contributorkey", "The private key of contributor address")
  .setAction(async ({ contractaddr: contractAddress, amount, contributorkey: contributorPrivateKey }, hre) => {
    // just with --network rinkeby doesn't work
    const provider = new hre.ethers.providers.JsonRpcProvider(process.env.RINKEBY_API_URL);
    const accountFrom = new hre.ethers.Wallet(contributorPrivateKey, provider);
    const etherAmount = hre.ethers.utils.parseEther(amount);

    const donation = new hre.ethers.Contract(contractAddress, abi, provider);
    await donation.connect(accountFrom).contribute({value: etherAmount});

    console.log(`Donated from address ${accountFrom.address} to contract ${contractAddress} in amount of ${amount} ETH`);
  });
