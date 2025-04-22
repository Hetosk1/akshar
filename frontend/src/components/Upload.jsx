import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEther } from "../contexts/etherContext";
import toast from "react-hot-toast";

const Upload = () => {
    const { uploadToSmartContract, isConnected, signer, contract, getFileLink } = useEther();
    if (!isConnected) {
        return <Navigate to="/" replace />;
    }

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [ipfsHash, setIpfsHash] = useState('');
    const [error, setError] = useState('');
    const [addresses, setAddresses] = useState(['']);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
            setIpfsHash('');
        } else {
            setFile(null);
            setError('Please select a PDF file only');
        }
    };

    const handleAddressChange = (index, value) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

    const addAddressField = () => {
        setAddresses([...addresses, '']);
    };

    const uploadToIPFS = async () => {
        if (!file) {
            setError('Please select a PDF file first');
            return;
        }

        if (file.type !== 'application/pdf') {
            setError('Only PDF files are allowed');
            return;
        }

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                    'pinata_api_key': 'f578721e7958b4a99d51',
                    'pinata_secret_api_key': 'b9012ea727b9034dfcd2316c21ffeb191b4112bc182b9f3620f617c68ab3a332' 
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();

            const fileId = await uploadToSmartContract(data.IpfsHash, addresses);

            for(let address of addresses) {
                const responseAPI = await fetch(`http://localhost:3000/file/${address}`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fileId })
                });
            }

            setIpfsHash(fileId);

        } catch (err) {
            setError('Failed to upload file: ' + err.message);
            toast.error(err.message)
        } finally {
            toast('File Uploaded', {icon: '👏'})
            setUploading(false);
        }
    };

    return (
        <div className="upload-section">
            <div className="container">
                <div className="upload-card">
                    <h2 className="section-title">Upload PDF to Akshar</h2>
                    <p className="lead">Securely store your PDF documents on the blockchain with controlled access</p>

                    <form
                        className="upload-form"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (uploading || !file) return;
                            try {
                                await uploadToIPFS();
                            } catch (error) {
                                console.error("Upload failed:", error);
                            }
                        }}
                    >
                        <div className="form-group">
                            <label>Select PDF to Upload</label>
                            <div className="file-input-wrapper">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,application/pdf"
                                    className="file-input"
                                    disabled={uploading}
                                    id="pdf-upload"
                                />
                                <label htmlFor="pdf-upload" className="file-label">
                                    {file ? file.name : 'Choose PDF file'}
                                </label>
                            </div>
                            <p className="file-info">Only PDF files are accepted</p>
                        </div>

                        <div className="form-group">
                            <label>Addresses with access:</label>
                            <div className="addresses-container">
                                {addresses.map((addr, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={addr}
                                        onChange={(e) => handleAddressChange(index, e.target.value)}
                                        className="address-input"
                                        placeholder="Enter Ethereum address"
                                    />
                                ))}
                            </div>
                            <button 
                                type="button" 
                                onClick={addAddressField} 
                                className="btn btn-outline add-address-btn"
                            >
                                + Add address
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading || !file}
                            className={`btn btn-primary upload-btn ${uploading || !file ? 'disabled' : ''}`}
                        >
                            {uploading ? 'Uploading...' : 'Upload to Akshar'}
                        </button>
                    </form>

                    {error && <div className="error-message">{error}</div>}

                    {ipfsHash && (
                        <div className="success-message">
                            <div className="success-icon"></div>
                            <h4>PDF uploaded successfully!</h4>
                            <div className="ipfs-hash-container">
                                <p className="ipfs-hash-label">File Id:</p>
                                <p className="ipfs-hash">{ipfsHash}</p>
                            </div>
                            <a
                                href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline view-ipfs-link"
                            >
                                View on IPFS
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Upload;