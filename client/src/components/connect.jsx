import { useEther } from '../contexts/etherContext';
import { useNavigate } from 'react-router-dom';

const Connect = () => {
  const { address, isConnected, connectWallet } = useEther();
  const navigate = useNavigate();

  const handleConnect = async () => {
    const success = await connectWallet();
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-8">Welcome to Ethereum App</h1>
      
      {!isConnected ? (
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">Connected Address:</p>
          <p className="font-mono bg-gray-100 p-2 rounded">
            {address}
          </p>
        </div>
      )}
    </div>
  );
};

export default Connect;