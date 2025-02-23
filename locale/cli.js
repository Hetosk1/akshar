import { intro, select, outro, text, spinner } from "@clack/prompts";
import fs from "fs";
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




async function main() {
    intro("Welcome to the File Management CLI");

    const action = await select({
        message: "Choose an option:",
        options: [
            { value: "upload", label: "📤 Upload File" },
            { value: "grant", label: "🔑 Grant Access" },
            { value: "get", label: "📥 Get File" },
        ],
    });

    if (action === "upload") {
        const filePath = await text({ message: "Enter the file path to upload:" });

        if (fs.existsSync(filePath)) {
            const s = spinner();
            s.start("Uploading file...");
            await new Promise((res) => setTimeout(res, 2000)); // Simulate upload
            s.stop("✅ File uploaded successfully!");
        } else {
            console.log("❌ File not found!");
        }
    }

    if (action === "grant") {
        const userAddress = await text({ message: "Enter the Ethereum address to grant access:" });
        console.log(`✅ Access granted to ${userAddress}`);
    }

    if (action === "get") {
        const fileName = await text({ message: "Enter the file name to retrieve:" });
        console.log(`📥 Retrieving file: ${fileName}`);
    }

    outro("Thank you for using the CLI!");
}

main();

