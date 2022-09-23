// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign newCampaign;

    address private s_owner;
    uint256 private s_campaignCounter;

    /// @dev Campaign Id => Campaign Address
    mapping(uint256 => address) private s_deployedCampaigns;

    /// @dev Campaign Id => Campaign Owner
    mapping(uint256 => address) private s_ownedCampaigns;

    constructor() {
        s_owner = msg.sender;
    }

    modifier onlyRegistredUsers() {
        _;
    }

    function createCampaign(uint256 budget) public {
        newCampaign = new Campaign(budget, msg.sender);
        uint256 campaignId = s_campaignCounter + 1;

        s_deployedCampaigns[campaignId] = address(newCampaign);
        s_ownedCampaigns[campaignId] = msg.sender;
    }

    function getDeployedCampaigns(uint256 campaignId)
        public
        view
        returns (address)
    {
        return s_deployedCampaigns[campaignId];
    }
}
