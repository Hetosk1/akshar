import Connect from "./components/connect";
import Home from "./components/home";
import Receive from './components/receive'
import Upload from "./components/upload";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EtherProvider } from "./contexts/etherContext";

function App() {
  return (
      <EtherProvider>
        <div className="min-h-screen">
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
