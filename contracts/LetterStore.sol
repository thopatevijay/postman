// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract LetterStore {

    struct LetterDetails {
        address sender;
        string letterURL;
        uint256 timestamp;
    }

    // Mapping from an address to their array of letter details
    mapping(address => LetterDetails[]) private letters;

    // Event to notify when a new letter is added
    event LetterStored(address indexed _from, string _letterURL, uint256 _timestamp);

    // Set the required fee to store a letter (0.1 Gwei, which is 0.0000000001 Ether)
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

    // Store the letter details on-chain
    function storeLetter(string memory _letterURL) public payable {
        require(bytes(_letterURL).length > 0, "Letter URL should not be empty");
        require(msg.value >= LETTER_FEE, "Insufficient fee sent");

        letters[msg.sender].push(LetterDetails({
            sender: msg.sender,
            letterURL: _letterURL,
            timestamp: block.timestamp
        }));

        emit LetterStored(msg.sender, _letterURL, block.timestamp);
    }

    // Retrieve all letter details for a given address
    function getLetters(address _address) public view returns (LetterDetails[] memory) {
        return letters[_address];
    }

    // Withdraw funds from the contract (restricted to the contract owner)
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
