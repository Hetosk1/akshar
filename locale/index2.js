import {ethers} from 'ethers';
export const contractABI =  [
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
];  

export const contractAddress = "0x0be00a5Cef1c18C2dD3e861A4b0c1100EBEf2F16"

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // Connect to Ganache
const privateKey = "0xba718777a62f96738b6f9a56cdef1672ce5cedf69537580a476baa9c45728f94"; // Replace with your Ganache private key
const signer = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, signer);


console.log(contract)

async function getFile(fileId) {
    try{
        const ipfsHash = await contract.getFile(fileId)
        console.log(ipfsHash);
    } catch(e) {
        console.log(e.message);
    }

}

getFile('0xd9bea52a991bc2a106597c0a9438c441c64dc7146f1352826a708f6b62d7d786');

