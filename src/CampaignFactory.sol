// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Campaign.sol";

error CampaignFactory__OnlyAdmin();
error CampaignFactory__OnlyOwner();
error CampaignFactory__OnlyRegistredUsers();

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

    mapping(address => bool) private s_isAdmin;

    mapping(address => bool) private s_isRegistredUser;

    ///////////////////
    /// CONSTRUCTOR ///
    ///////////////////

    constructor() {
        s_owner = msg.sender;
    }

    /////////////////
    /// MODIFIERS ///
    /////////////////

    modifier onlyOwner() {
        if (s_owner != msg.sender) revert CampaignFactory__OnlyOwner();
        _;
    }

    modifier onlyAdmin() {
        if (!s_isAdmin[msg.sender]) revert CampaignFactory__OnlyAdmin();
        _;
    }

    modifier onlyRegistredUsers() {
        if (!s_isRegistredUser[msg.sender])
            revert CampaignFactory__OnlyRegistredUsers();
        _;
    }

    function createCampaign(
        string memory image,
        string memory name,
        string memory website,
        string[3] memory keywords,
        string memory demography,
        uint256 duration /* days */
    ) public {
        Campaign newCampaign = new Campaign(
            image,
            name,
            website,
            keywords,
            demography,
            duration
        );

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

    /////////////
    /// OWNER ///
    /////////////

    function registerAdmin(address newAdmin) public onlyOwner {
        s_isAdmin[newAdmin] = true;
    }

    function deleteAdmin(address admin) public onlyOwner {
        s_isAdmin[admin] = false;
    }
}
