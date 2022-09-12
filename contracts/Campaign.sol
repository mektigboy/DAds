// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

error Campaign__NotCampaignManager();

contract Campaign {
    address private s_campaignManager;
    uint256 private s_campaignBudget;
    address[100] public s_validators;

    modifier onlyCampaignManager() {
        if (s_campaignManager != msg.sender)
            revert Campaign__NotCampaignManager();
        _;
    }

    constructor() payable {
        s_campaignManager = msg.sender;
        s_campaignBudget = msg.value;
    }

    function campaignVoting() public {}
}
