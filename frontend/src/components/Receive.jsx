import { useEther } from "../contexts/etherContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Receive = () => {
    const { address, isConnected, connectWallet, getFileLink } = useEther();

    if (isConnected !== true) {
        return <Navigate to="/" replace />;
    }

    const [fileId, setFileId] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileFound, setFileFound] = useState(false);
    
    // New state for user's file list
    const [userFiles, setUserFiles] = useState([]);
    const [filesLoading, setFilesLoading] = useState(false);
    const [filesError, setFilesError] = useState('');

const fetchUserFiles = async () => {
    if (!address) return;

    setFilesLoading(true);
    setFilesError('');

    try {
        const response = await fetch(`http://localhost:3000/file/${address}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const data = await response.json();
        
        console.log('Received data:', data);

        // More robust checking of file list
        if (data.user && Array.isArray(data.user.files)) {
            setUserFiles(data.user.files);
            
            if (data.user.files.length === 0) {
                console.log('No files found for this address');
            }
        } else {
            console.log('Unexpected data structure:', data);
            setUserFiles([]);
        }
    } catch (error) {
        console.error('Full error details:', error);
        setFilesError(`Detailed error: ${error.message}`);
        toast.error(`File fetch error: ${error.message}`);
    } finally {
        setFilesLoading(false);
    }
};

    // Fetch files when component mounts or address changes
    useEffect(() => {
        fetchUserFiles();
    }, [address]);

    const handleFileIdChange = (e) => {
        setFileId(e.target.value);
        setError('');
        setFileFound(false);
        setIpfsHash('');
    };

    const fetchFileFromContract = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError('');
        setFileFound(false);

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
                {/* User Files Section */}
                <div className="user-files-section">
                    <h3>Your Files</h3>
                    {filesLoading ? (
                        <p>Loading files...</p>
                    ) : filesError ? (
                        <p className="error-message">{filesError}</p>
                    ) : userFiles.length > 0 ? (
                        <div className="file-list">
                            {userFiles.map((file, index) => (
                                <div key={index} className="file-item">
                                    <span 
                                        className="file-id"
                                        onClick={() => {
                                            setFileId(file);
                                            toast.success('File ID copied to input');
                                        }}
                                    >
                                        {file}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No files found</p>
                    )}
                </div>

                <h2 className="upload-title">Receive File from Akshar</h2>

                <form className="upload-form" onSubmit={fetchFileFromContract}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={fileId}
                            onChange={handleFileIdChange}
                            className="address-input"
                            disabled={loading}
                            placeholder="Enter File ID"
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