// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Campaign {
    uint256 private s_campaignBudget;
    address private s_campaignOwner;

    struct Advertisment {
        string name;
        string description;
        uint256 budget;
        address owner;
        bool isActive;
    }

    constructor(uint256 budget, address owner) {
        s_campaignBudget = budget;
        s_campaignOwner = owner;
    }
}
