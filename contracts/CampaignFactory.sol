// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./Campaign.sol";

error CampaignFactory__NotClient();

contract CampaignFactory {
    uint256 campaignId;
    Campaign[] public campaignList;

    // MODIFIERS

    // modifier onlyClient() {}

    constructor() {}

    function createCampaign() public /* onlyClient */
    {
        Campaign newCampaign = new Campaign();
        campaignList.push(newCampaign);
    }
}
