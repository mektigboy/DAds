// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

contract ETHOnline is ERC721Holder
{
    ITablelandTables internal _tableland;
    string internal _tablePrefix;
    string public tableName;
    uint256 internal _tableId;
    uint256 internal _counter;

    constructor(address _registry) payable
    {
        _tablePrefix="dads";
        _tableland=ITablelandTables(_registry);
        _counter=0;
    }

    function createTable() external payable{
        _tableId= _tableland.createTable(
            address(this),
             string.concat(
                 "CREATE TABLE ",
                 _tablePrefix,
                 "_",
                  StringsUpgradeable.toString(block.chainid),
                 " (id int primary key, website text, image text , campaignId int);"
             )
        );

            tableName= string.concat(
                _tablePrefix,
                "_",
                StringsUpgradeable.toString(block.chainid),
                "_",
                StringsUpgradeable.toString(_tableId)
            );
    }
    function insertInto(string memory website,string memory image,uint256 campaignId) external payable {
        _tableland.runSQL(
            address(this),
            _tableId,
            string.concat(
                "INSERT INTO ",
                  tableName,
                " (id, website , image , campaignId) VALUES(",StringsUpgradeable.toString(_counter),", '" ,website, "', '" ,image, "', ", StringsUpgradeable.toString(campaignId), ")"
            )
        );
         _counter=_counter+1;
    }

     function update(string memory image,uint256 campaignId) external payable {
        _tableland.runSQL(
            address(this),
            _tableId,
            string.concat(
            "UPDATE ",
            tableName,
            " SET image = ",
            "'" ,image,"'"
            " WHERE id = ",
            StringsUpgradeable.toString(campaignId),
            ";"
            )
        );
    }


}