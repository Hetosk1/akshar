import { useEther } from "../contexts/etherContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-hot-toast';

const Receive = () => {
    const { address, isConnected, connectWallet, getFileLink } = useEther();

    if (isConnected !== true) {
        return <Navigate to="/" replace />;
    }

    console.log(address);

    const [fileId, setFileId] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileFound, setFileFound] = useState(false);

    if (!isConnected) {
        return <Navigate to="/" replace />;
    }

    const handleFileIdChange = (e) => {
        setFileId(e.target.value);
        setError('');
        setFileFound(false);
        setIpfsHash('');
    };

    const fetchFileFromContract = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError('');  // Clear previous errors
        setFileFound(false);  // Reset the fileFound flag

        try {
            const ipfsHash = await getFileLink(fileId);
            console.log('IPFS Hash:', ipfsHash);

            if (ipfsHash) {
                setFileFound(true);
                setIpfsHash(ipfsHash);
                toast.success('File found successfully!');
            }
        } catch (error) {
            console.error('Error fetching file:', error);

            if (error.message.includes("Access Denied")) {
                setError('Access Denied: You do not have permission to view this file.');
                toast.error('Access Denied: You do not have permission to view this file.');
            } else {
                setError('An error occurred while fetching the file.');
                toast.error('An error occurred while fetching the file.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2 className="upload-title">Receive File from Akshar</h2>

                <form className="upload-form" onSubmit={fetchFileFromContract}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={fileId}
                            onChange={handleFileIdChange}
                            className="address-input"
                            disabled={loading}
                        />
                        <p className="file-info">Enter the File ID provided by the sender</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !fileId.trim()}
                        className={`upload-btn ${loading || !fileId.trim() ? 'disabled' : ''}`}
                    >
                        {loading ? 'Fetching...' : 'Fetch File'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {fileFound && ipfsHash && (
                    <div className="success-message">
                        <p>File found successfully!</p>
                        <p className="ipfs-hash-label">IPFS Hash:</p>
                        <p className="ipfs-hash">{ipfsHash}</p>
                        <a
                            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-ipfs-link"
                        >
                            View on IPFS
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Receive;
