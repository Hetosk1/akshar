import Connect from "./components/Connect";
import Home from "./components/Home";
import Receive from './components/Receive';
import Upload from "./components/Upload";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { EtherProvider, useEther } from "./contexts/etherContext";
import './App.css'; // Import the CSS file
import {toast} from 'react-hot-toast';

function App() {
  const navigate = useNavigate();
  const { address, isConnected, connectWallet } = useEther();

  return (
    <div className="min-h-screen">
      <nav>
        <div onClick={() => navigate('/home')}>Home</div>
        <div onClick={() => navigate('/receive')}>Receive</div>
        <div onClick={() => navigate('/upload')}>Upload</div>
        {address && <div className="address-display">Address: {address}</div>}
      </nav>
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Connect />} />
          <Route path="/home" element={<Home />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;