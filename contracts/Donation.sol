//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Donation {
    address owner;

    struct ContributionStruct {
        uint value;
        bool isParticipant;
    }

    mapping (address => ContributionStruct) contribution;

    address[] contributors;

    modifier onlyOwner {
        require(owner == msg.sender, "Not enough rights");
        _;
    }

    modifier validAmount(uint amount) {
        require(amount > 0, "The amount is too small");
        _;
    }

    modifier validDestination( address to ) {
        // require(to != address(0x0), "Not valid destination");
        require(to != address(this), "Not valid destination");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function contribute() external payable validAmount(msg.value) {
        uint donationAmount = msg.value;
        address contributor = msg.sender;

        if (contribution[contributor].isParticipant == false) {
            contributors.push(contributor);
            contribution[contributor].isParticipant = true;
        }

        contribution[contributor].value += donationAmount;
    }

    function withdrawToAddress(address payable recipient, uint amount) external
        onlyOwner
        validDestination(recipient)
        validAmount(amount)
    {
        require(amount <= address(this).balance, "Not enough donations to withdraw");

        (bool success, ) = recipient.call{value: amount, gas: 0}("");
        require(success, "Withdraw failed");
    }

    function getContributors() external view returns (address[] memory) {
        return contributors;
    }

    function getContributorDonation(address contributor) external view returns (uint) {
        return contribution[contributor].value;
    }

}
