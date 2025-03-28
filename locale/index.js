import {ethers} from 'ethers';

const contractAddress = "0x55046A212991b8eb8Ec7F358fA1577f5332c8696"; 
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "fileId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "AccessGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "fileId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "accessList",
          "type": "address[]"
        }
      ],
      "name": "FileUploaded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        },
        {
          "internalType": "address[]",
          "name": "_accessList",
          "type": "address[]"
        }
      ],
      "name": "uploadFile",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_fileId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "grantAccess",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_fileId",
          "type": "bytes32"
        }
      ],
      "name": "getFile",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
];

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // Connect to Ganache
const privateKey = "0x00c93ee984624c3c43f307afea9a183f1663d28f117f22290db9610e084e12cf"; // Replace with your Ganache private key
const signer = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, signer);


console.log(contract)

async function uploadFile(ipfsHash, addressAccessList){
  const file = await contract.uploadFile(ipfsHash, addressAccessList);
  console.log(file);
}

async function handleEvent(fileId, ipfsHash, owner, accessList){
  console.log('avvv kaleja');
  console.log(fileId, ipfsHash, owner, accessList);
}

contract.on("FileUploaded", handleEvent);

uploadFile("123123123123132", ["0x92E563d2f15fa37539F262C9e6dA42B04480eCE2", "0xC9F4E2B5443bE84E6cb15A5B6516FCf337D5bd9c"])

