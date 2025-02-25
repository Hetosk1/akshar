import {ethers} from'ethers';

export const contractABI = [
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
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
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
  ]

export const contractAddress = "0x73156dc668916D36CB2D2150A58C280e11dd1D3A"

export const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // Connect to Ganache
export const privateKey = "0x00c93ee984624c3c43f307afea9a183f1663d28f117f22290db9610e084e12cf"; // Replace with your Ganache private key
export const signer = new ethers.Wallet(privateKey, provider);

export const AdminContract = new ethers.Contract(contractAddress, contractABI, signer);

