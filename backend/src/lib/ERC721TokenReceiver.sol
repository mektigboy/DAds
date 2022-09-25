// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title ERC721TokenReceiver
/// @author mektigboy
/// @dev Modified from Solmate contracts (https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC721.sol)
abstract contract ERC721TokenReceiver {
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external virtual returns (bytes4) {
        return ERC721TokenReceiver.onERC721Received.selector;
    }
}