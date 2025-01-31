import { createContext, useContext, useState } from 'react';

const EtherContext = createContext(null);

export const EtherProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        const userAddress = accounts[0];
        setAddress(userAddress);
        setIsConnected(true);
        localStorage.setItem('address', userAddress);
        
        return true;
      } catch (error) {
        console.error('Error connecting wallet:', error);
        return false;
      }
    } else {
      alert('Please install MetaMask!');
      return false;
    }
  };

  return (
    <EtherContext.Provider 
      value={{ 
        address, 
        setAddress,
        isConnected,
        connectWallet 
      }}
    >
      {children}
    </EtherContext.Provider>
  );
};

export const useEther = () => useContext(EtherContext);

export default EtherContext;