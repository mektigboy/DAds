// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title Campaign
/// @author mektigboy
/// @notice
/// @dev
contract Campaign {
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

    ////////////////////
    /// ADVERTISMENT ///
    ////////////////////

    struct Advertisment {
        string image;
        string name;
        string website;
        string[3] keywords;
        string demography;
        uint256 budget;
        uint256 duration;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    ///////////////
    /// STORAGE ///
    ///////////////

    uint256 private s_campaignBudget;
    address private s_campaignOwner;
    address private s_campignManager;

    ///////////////////
    /// CONSTRUCTOR ///
    ///////////////////

    constructor(uint256 budget, address owner) {
        s_campaignBudget = budget;
        s_campaignOwner = owner;
    }
}
