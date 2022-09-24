// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ERC721TokenReceiver.sol";

/// @title ERC721
/// @author mektigboy
/// @notice Non-Transferable ERC721
/// @dev Modified from Solmate contracts (https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC721.sol)
abstract contract ERC721 {
    //////////////
    /// EVENTS ///
    //////////////

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 indexed id
    );

    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed id
    );

    ///////////////
    /// STORAGE ///
    ///////////////

    string public name;

    string public symbol;

    /// @notice Token owner
    mapping(uint256 => address) internal _ownerOf;

    /// @notice Token balance
    mapping(address => uint256) internal _balanceOf;

    mapping(uint256 => address) public getApproved;

    mapping(address => mapping(address => bool)) public isApprovedForAll;

    ///////////////////
    /// CONSTRUCTOR ///
    ///////////////////

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    /////////////////////////////////
    /// TOKEN BALANCE & OWNERSHIP ///
    /////////////////////////////////

    function ownerOf(uint256 id) public view virtual returns (address owner) {
        require((owner = _ownerOf[id]) != address(0), "ERC721: Not Minted");
    }

    function balanceOf(address owner) public view virtual returns (uint256) {
        require(owner != address(0), "ERC721: Zero Address");

        return _balanceOf[owner];
    }

    ///////////////////
    /// TOKEN LOGIC ///
    ///////////////////

    function approve(address spender, uint256 id) public virtual {
        address owner = _ownerOf[id];

        require(
            msg.sender == owner || isApprovedForAll[owner][msg.sender],
            "ERC721: Not Authorized"
        );

        getApproved[id] = spender;

        emit Approval(owner, spender, id);
    }

    function setApprovalForAll(address operator, bool approved) public virtual {
        isApprovedForAll[msg.sender][operator] = approved;

        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function transferFrom(
        address from,
        address to,
        uint256 id
    ) public virtual {
        require(from == _ownerOf[id], "ERC721: Wrong Form");

        require(to != address(0), "ERC721: Invalid Recipient");

        require(
            msg.sender == from ||
                isApprovedForAll[from][msg.sender] ||
                msg.sender == getApproved[id],
            "ERC721: Not Authorized"
        );

        unchecked {
            _balanceOf[from]--;

            _balanceOf[to]++;
        }

        _ownerOf[id] = to;

        delete getApproved[id];

        emit Transfer(from, to, id);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id
    ) public virtual {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(
                    msg.sender,
                    from,
                    id,
                    ""
                ) ==
                ERC721TokenReceiver.onERC721Received.selector,
            "ERC721: Unsafe Recipient"
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        bytes calldata data
    ) public virtual {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(
                    msg.sender,
                    from,
                    id,
                    data
                ) ==
                ERC721TokenReceiver.onERC721Received.selector,
            "ERC721: Unsafe Recipient"
        );
    }

    /////////////////////////
    /// TOKEN MINT & BURN ///
    /////////////////////////

    function _mint(address to, uint256 id) internal virtual {
        require(to != address(0), "ERC721: Invalid Recipient");

        require(_ownerOf[id] == address(0), "ERC721: Already Minted");

        unchecked {
            _balanceOf[to]++;
        }

        _ownerOf[id] = to;

        emit Transfer(address(0), to, id);
    }

    function _burn(uint256 id) internal virtual {
        address owner = _ownerOf[id];

        require(owner != address(0), "ERC721: Not Minted");

        unchecked {
            _balanceOf[owner]--;
        }

        delete _ownerOf[id];

        delete getApproved[id];

        emit Transfer(owner, address(0), id);
    }

    ///////////////////////
    /// TOKEN SAFE MINT ///
    ///////////////////////

    function _safeMint(address to, uint256 id) internal virtual {
        _mint(to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(
                    msg.sender,
                    address(0),
                    id,
                    ""
                ) ==
                ERC721TokenReceiver.onERC721Received.selector,
            "ERC721: Unsafe Recipient"
        );
    }

    function _safeMint(
        address to,
        uint256 id,
        bytes memory data
    ) internal virtual {
        _mint(to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(
                    msg.sender,
                    address(0),
                    id,
                    data
                ) ==
                ERC721TokenReceiver.onERC721Received.selector,
            "ERC721: Unsafe Recipient"
        );
    }

    //////////////////////
    /// TOKEN METADATA ///
    //////////////////////

    function tokenURI(uint256 id) public view virtual returns (string memory) {}

    //////////////
    /// ERC165 ///
    //////////////

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        returns (bool)
    {
        return
            interfaceId == 0x01ffc9a7 || // ERC165 Interface ID for ERC165
            interfaceId == 0x80ac58cd || // ERC165 Interface ID for ERC721
            interfaceId == 0x5b5e139f; // ERC165 Interface ID for ERC721Metadata
    }
}
