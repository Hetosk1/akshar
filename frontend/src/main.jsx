import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { EtherProvider, useEther } from "./contexts/etherContext";
import {Toaster} from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EtherProvider>    
      <BrowserRouter>    
        <Toaster/>
        <App />
      </BrowserRouter>
    </EtherProvider>
  </StrictMode>,
)
