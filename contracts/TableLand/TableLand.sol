pragma solidity ^0.8.12;
// SPDX-License-Identifier: MIT
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
        _tablePrefix="ethonline";
        _tableland=ITablelandTables(_registry);
        _counter=0;
    }

    function createTable() external payable{
        _tableId= _tableland.createTable(
            address(this),
             string.concat(
                 "CREATE TABLE",
                 _tablePrefix,
                 "_",
                  StringsUpgradeable.toString(block.chainid),
                 "(id int primary key,uri text,addr text); "
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
    function insertInto(string memory uri,string memory addr) external payable {
        _tableland.runSQL(
            address(this),
            _tableId,
            string.concat(
                "INSERT INTO",
                  tableName,
                " (id,uri ,addr ) VALUES(", StringsUpgradeable.toString(_counter), ",'",uri, ",'", addr,"')"
            )
        );
         _counter=_counter+1;
    }

     function update(string memory uri,uint256 id) external payable {
        _tableland.runSQL(
            address(this),
            _tableId,
            string.concat(
            "UPDATE ",
            tableName,
            " SET uri = ",
            uri,
            " WHERE id = ",
            StringsUpgradeable.toString(id),
            ";"
            )
        );
    }


}