// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./lib/ERC721.sol";

error Campaign__OnlyCampaignManager();

/// @title Campaign
/// @author mektigboy
/// @notice
/// @dev
contract Campaign {
    ///////////////
    /// STORAGE ///
    ///////////////

    ////////////////
    /// CAMPAIGN ///
    ////////////////

    /// Structure:
    /// 1) Image
    /// 2) Name
    /// 3) Website
    /// 4) Keywords (Min. 3)
    /// 5) Demography
    /// 6) Budget
    /// 7) Duration

    ///////////////////////
    /// CAMPAIGN INPUTS ///
    ///////////////////////

    string private s_image;
    string private s_name;
    string private s_website;
    string[3] private s_keywords;
    string private s_demography;
    uint256 private s_budget;
    uint256 private s_duration;

    /////////////////////
    /// CAMPAIGN DATA ///
    /////////////////////

    address private s_manager;
    uint256 private s_creationDate;
    uint256 private s_expirationDate;
    bool private s_isCampaignActive;
    uint256 private s_approvalCount;

    mapping(address => bool) s_approvals;

    ///////////////////
    /// CONSTRUCTOR ///
    ///////////////////

    constructor(
        string memory image,
        string memory name,
        string memory website,
        string[3] memory keywords,
        string memory demography,
        uint256 duration /* days */
    ) payable {
        s_image = image;
        s_name = name;
        s_website = website;
        s_keywords = keywords;
        s_demography = demography;
        s_budget = msg.value; // ETH
        s_duration = duration * 86400; // 86400 = 1 day

        s_manager = msg.sender;
        s_creationDate = block.timestamp;
        
        s_expirationDate = s_creationDate + s_duration;
        s_isCampaignActive = true;
    }

    /////////////////
    /// MODIFIERS ///
    /////////////////

    modifier onlyCampaignManager() {
        if (s_manager != msg.sender)
            revert Campaign__OnlyCampaignManager();
        _;
    }

    function updateCampaignManager(address newManager) public onlyCampaignManager {
        s_manager = newManager;
    }

    ///////////////
    /// GETTERS ///
    ///////////////

    function getCampaignImage() public view returns (string memory) {
        return s_image;
    }

    function getCampaignWebsite() public view returns (string memory) {
        return s_website;
    }

    function getCampaignManager() public view returns (address) {
        return s_manager;
    }
}
