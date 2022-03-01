import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

const amount = {
  eth1: ethers.utils.parseEther("1"),
  eth2: ethers.utils.parseEther("2"),
  eth3: ethers.utils.parseEther("3"),
  eth4: ethers.utils.parseEther("4"),
  eth10: ethers.utils.parseEther("10"),
}

describe("Donation", function () {

  let donation: Contract, owner: SignerWithAddress, accounts: SignerWithAddress[];

  beforeEach(async () => {
    [owner, ...accounts] = await ethers.getSigners();

    const donationContractFactory = await ethers.getContractFactory("Donation");
    donation = await donationContractFactory.deploy();
    await donation.deployed();
  })

  it("Should accept a donation", async function () {
    const contractAddress = donation.address;

    await expect(donation.connect(accounts[2]).contribute({ value: 0 }))
        .to.be.revertedWith("The amount is too small");

    await expect(await donation.connect(accounts[3]).contribute({ value: amount.eth1 }))
        .to.changeEtherBalance(donation, amount.eth1);

    await donation.connect(accounts[3]).contribute({ value: amount.eth3 });
    expect(await ethers.provider.getBalance(contractAddress)).to.equal(amount.eth4);
  });

  it("Should transfer any amount of donation to the specified address, " +
      "available only for contract owner", async function () {
    await donation.connect(accounts[2]).contribute({ value: amount.eth4 });

    const contractAddress = donation.address;
    const recipientAddress = accounts[2].address;

    await expect(donation.connect(accounts[2]).withdrawToAddress(recipientAddress, amount.eth3))
        .to.be.revertedWith("Not enough rights");

    await expect(donation.withdrawToAddress(contractAddress, amount.eth3))
      .to.be.revertedWith("Not valid destination");

    await expect(donation.withdrawToAddress(recipientAddress, 0))
        .to.be.revertedWith("The amount is too small");

    await expect(donation.withdrawToAddress(recipientAddress, amount.eth10))
        .to.be.revertedWith("Not enough donations to withdraw");

    await expect(await donation.withdrawToAddress(recipientAddress, amount.eth3))
        .to.changeEtherBalance(accounts[2], amount.eth3);

    expect(await ethers.provider.getBalance(contractAddress)).to.equal(amount.eth1);

  });

  it("Should store all contributors addresses without duplicates", async function () {
    await donation.connect(accounts[1]).contribute({ value: amount.eth4 });
    await donation.connect(accounts[2]).contribute({ value: amount.eth2 });
    await donation.connect(accounts[1]).contribute({ value: amount.eth1 });
    await donation.connect(accounts[3]).contribute({ value: amount.eth3 });

    expect(await donation.getContributors()).to.eql([
        accounts[1].address,
        accounts[2].address,
        accounts[3].address
    ]);
  });

  it("Should store contributors donations", async function () {
    await donation.connect(accounts[1]).contribute({ value: amount.eth3 });
    await donation.connect(accounts[2]).contribute({ value: amount.eth2 });
    await donation.connect(accounts[1]).contribute({ value: amount.eth1 });
    await donation.connect(accounts[3]).contribute({ value: amount.eth3 });

    expect(await donation.getContributorDonation(accounts[1].address)).to.equal(amount.eth4);
    expect(await donation.getContributorDonation(accounts[2].address)).to.equal(amount.eth2);
  });

});

