import { createContext, useContext, useState } from 'react';
import { ethers, WebSocketProvider } from 'ethers'
import {contractABI, contractAddress, AdminContract} from '../contractABI';

const EtherContext = createContext(null);

export const EtherProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if(typeof window.ethereum !== 'undefined') {
      try {

        const userAddress = await window.ethereum.request({ method: "eth_requestAccounts" }); // Request account access
        const provider = new ethers.BrowserProvider(window.ethereum)
        const _signer = await provider.getSigner();

        setSigner(_signer);
        setAddress(userAddress[0]);
        setIsConnected(true);
        
        const _contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(_contract);

        localStorage.getItem('address', address)
        console.log(_signer);
        console.log(_contract);

        return true;

      } catch(e){
        console.error("User denied account access", e);
      }
    } else {
      console.error("Error connecting wallet: ", error);
      return false;
    }
  }

  const uploadToSmartContract = async (ipfsHash, accessList) => {

    console.log('lemarohalfhour');
    console.log("IPFS Hash: " + ipfsHash + '\nOwner: ' + signer.address + "\nAccessList: " + accessList);
    console.log("Signer: " + await signer.getAddress());

    const provider = await new ethers.BrowserProvider(window.ethereum)
    const _signer = await provider.getSigner();
    const _contract = new ethers.Contract(contractAddress, contractABI, _signer);

    const tx = await _contract.uploadFile(ipfsHash, accessList);
    const receipt = await tx.wait();

    const event = receipt.logs.find(log => log.fragment.name === "FileUploaded");
    
    if (event) {
        const fileId = event.args[0]; // Assuming first argument is fileId
        console.log("File ID: " + fileId);
        return fileId;
    } else {
        throw new Error("FileUploaded event not found in transaction receipt");
    }
  }

  const getFileLink = async (fileId) => {
    console.log("File ID: " + fileId);

    const provider = await new ethers.BrowserProvider(window.ethereum);
    const _signer = await provider.getSigner();
    const _contract = new ethers.Contract(contractAddress, contractABI, _signer);

    try {
        // Call the getFile method to get the IPFS hash
        const fileLink = await _contract.getFile(fileId);
        
        console.log(fileLink); // This will log the IPFS hash

        return fileLink; // Returning the IPFS hash
    } catch (error) {
        console.error("Error getting file:", error);

        // Check for specific error and handle it
        if (error.message.includes("Access Denied")) {
            throw new Error("Access Denied: You do not have permission to view this file.");
        }

        // For other errors, return a generic message
        throw new Error("An error occurred while fetching the file.");
    }


};


  return (
    <EtherContext.Provider 
      value={{ 
        address, 
        setAddress,
        isConnected,
        connectWallet,
        signer,
        contract,
        uploadToSmartContract,
        getFileLink
      }}
    >
      {children}
    </EtherContext.Provider>
  );
};

export const useEther = () => useContext(EtherContext);

export default EtherContext;