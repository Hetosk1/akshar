// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {

    struct FileDetails {
        string ipfsHash;
        address owner;
        mapping(address => bool) accessList;
    }

    mapping(bytes32 => FileDetails) private files;

    event FileUploaded(bytes32 fileId, string ipfsHash, address owner, address[] accessList) ;
    event AccessGranted(bytes32 fileId, address user);

    function uploadFile(string memory _ipfsHash, address[] memory _accessList) public {

        bytes32 fileId = keccak256(abi.encodePacked(_ipfsHash, msg.sender, block.timestamp));
        FileDetails storage file = files[fileId];
        file.ipfsHash = _ipfsHash;
        file.owner = msg.sender;

        for(uint256 i=0; i<_accessList.length; i++){
            file.accessList[_accessList[i]] = true;
        }

        emit FileUploaded(fileId, _ipfsHash, msg.sender, _accessList);

    }

    function grantAccess(bytes32 _fileId, address _user) public {

        require(files[_fileId].owner == msg.sender, "Only owner can grant access");
        files[_fileId].accessList[_user] = true;

        emit AccessGranted(_fileId, _user);

    }

    function getFile(bytes32 _fileId) public view returns (string memory) {

        require(files[_fileId].accessList[msg.sender], "Access Denied");
        return files[_fileId].ipfsHash;

    }

}
