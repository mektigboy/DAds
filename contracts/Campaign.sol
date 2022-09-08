// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Campaign {
    struct NewCampaign {
        uint256 campaignId;
        string campaignName;
    }

    // mapping(address => Advertisment) private campaigns;
    mapping(address => mapping(uint256 => NewCampaign)) private campaigns;
}
