// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Campaign.sol";

/// @title CampaignFactory
/// @author mektigboy
/// @notice
/// @dev
contract CampaignFactory {
    ///////////////
    /// STORAGE ///
    ///////////////

    address private s_owner;
    uint256 private s_campaignCounter;

    /// @dev Campaign Id => Campaign Address
    mapping(uint256 => address) private s_deployedCampaigns;

    /// @dev Campaign Id => Campaign Owner
    mapping(uint256 => address) private s_ownedCampaigns;

    ///////////////////
    /// CONSTRUCTOR ///
    ///////////////////

    constructor() {
        s_owner = msg.sender;
    }

    /////////////////
    /// MODIFIERS ///
    /////////////////

    modifier onlyRegistredUsers() {
        _;
    }

    function createCampaign(uint256 budget) public {
        Campaign newCampaign = new Campaign(budget, msg.sender);
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
