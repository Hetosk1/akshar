import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEther } from "../contexts/etherContext";

const Upload = () => {
    const {address, isConnected, connectWallet} = useEther();

    if(!localStorage.getItem('address') ){
        return <Navigate to='/' replace/>
    }

    console.log(address);

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [ipfsHash, setIpfsHash] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        // Check if a file was selected and if it's a PDF
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
            setIpfsHash('');
        } else {
            setFile(null);
            setError('Please select a PDF file only');
        }
    };

    const uploadToIPFS = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a PDF file first');
            return;
        }

        // Double-check file type before uploading
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
            setIpfsHash(data.IpfsHash);
        } catch (err) {
            setError('Failed to upload file: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Upload PDF to IPFS</h2>
                
                {/* Connected Address Display */}
                <div className="mb-6">
                    <p className="text-sm text-gray-600">Connected Address:</p>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded">{address}</p>
                </div>

                <form onSubmit={uploadToIPFS}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Select PDF to Upload
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,application/pdf"
                            className="w-full border border-gray-300 rounded p-2"
                            disabled={uploading}
                        />
                        <p className="text-sm text-gray-500 mt-1">Only PDF files are accepted</p>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading || !file}
                        className={`w-full py-2 px-4 rounded ${
                            uploading || !file
                                ? 'bg-gray-400'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white font-semibold`}
                    >
                        {uploading ? 'Uploading...' : 'Upload to IPFS'}
                    </button>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {ipfsHash && (
                    <div className="mt-4">
                        <p className="text-green-600 font-semibold mb-2">
                            PDF uploaded successfully!
                        </p>
                        <p className="text-sm text-gray-600">IPFS Hash:</p>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                            {ipfsHash}
                        </p>
                        <a
                            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
                        >
                            View on IPFS
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Upload;