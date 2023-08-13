// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract LetterFeeCollector {

    // Event to notify when the fee is received
    event FeeReceived(address indexed _from, uint256 _timestamp);

    // Set the required fee (0.1 Gwei, which is 0.0000000001 Ether)
    uint256 public constant LETTER_FEE = 0.0000000001 ether;

    // Contract owner address
    address public owner;

    // Restrict certain functions to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to allow payment of the fee
    function payFee() public payable {
        require(msg.value == LETTER_FEE, "Incorrect fee sent");
        emit FeeReceived(msg.sender, block.timestamp);
    }

    // Withdraw funds from the contract (restricted to the contract owner)
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
