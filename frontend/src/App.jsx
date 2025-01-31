import Connect from "./components/Connect";
import Home from "./components/Home";
import Receive from './components/Receive'
import Upload from "./components/Upload";

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { EtherProvider } from "./contexts/etherContext";

function App() {
  const navigate = useNavigate();
  return (
      <EtherProvider>
        <div className="min-h-screen">
          <div>
            <div onClick={() => {navigate('/home')}}>Home</div>
            <div onClick={() => {navigate('/receive')}}>Receive</div>
            <div onClick={() => {navigate('/upload')}}>Upload</div>
          </div>
          <Routes>
            <Route exact path="/" element={<Connect />} />
            <Route path="/home" element={<Home />} />
            <Route path="/receive" element={<Receive />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
     </EtherProvider>
  );
}

export default App;
