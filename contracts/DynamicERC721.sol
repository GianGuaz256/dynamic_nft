// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Collection1 is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    mapping(uint256=>string[]) private dynamicData;

    constructor() ERC721("Collection1", "CLL1") {}

    function safeMint(address to, string memory _uri) public onlyOwner {
        _safeMint(to, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), _uri);
        _tokenIdCounter.increment();
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function addDataToDynamicNFT(uint256 _tokenId, string memory _data) public onlyOwner {
        //check must be done in the client of the app
        require(_exists(_tokenId), "ERC721URIStorage: URI set of nonexistent token");
        dynamicData[_tokenId].push(_data);
    }
    
    function getDynamiData(uint256 _tokenId) external view onlyOwner returns(string[] memory) {
        require(_exists(_tokenId), "ERC721URIStorage: URI set of nonexistent token");
        return dynamicData[_tokenId];
    }
    
    function getTokenIdsCount() external view onlyOwner returns(uint256) {
        return _tokenIdCounter.current();
    }
}