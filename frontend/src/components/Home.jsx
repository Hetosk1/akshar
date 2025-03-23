import { useEther } from "../contexts/etherContext";
import { Navigate } from "react-router-dom";
import '../home.css';
import hero from '../images/1.png';

const Home = () => {
    
    const { address, isConnected, connectWallet } = useEther();
    
    if(isConnected != true) {
        return <Navigate to='/' replace/>
    }

    console.log(address);
      return (
    <div className="akshar-app">
      
      <main>
        <section className="hero container">
          <div className="hero-content">
            <h1>Decentralized file sharing with <span className="highlight">Akshar</span></h1>
            <p className="lead">Share your files securely using web3 technology. No central servers, no data breaches, just pure privacy and control over your content.</p>
            <button className="btn">Get Started</button>
          </div>
          <div className="hero-image">
            <img src={hero} alt="Akshar file sharing illustration" />
          </div>
        </section>
        
        <section className="container">
          <div className="features">
            <div className="feature">
              <h3>Decentralized Storage</h3>
              <p>Your files are distributed across the network, ensuring no single point of failure and maximum uptime.</p>
            </div>
            <div className="feature">
              <h3>End-to-End Encryption</h3>
              <p>Military-grade encryption keeps your files secure, with only you controlling access rights.</p>
            </div>
            <div className="feature">
              <h3>Token Rewards</h3>
              <p>Earn Akshar tokens by sharing storage space or contributing to the network.</p>
            </div>
          </div>
        </section>
        
        <section className="container workflow-section">
          <h2>How Akshar Works</h2>
          <img src="c.png" alt="Akshar workflow diagram" />
        </section>
      </main>
      
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Akshar</h3>
              <p>The future of decentralized file sharing, powered by web3 technology.</p>
            </div>
            <div className="footer-section">
              <h3>Links</h3>
              <a href="#">Home</a>
              <a href="#">Features</a>
              <a href="#">Whitepaper</a>
              <a href="#">Tokenomics</a>
            </div>
            <div className="footer-section">
              <h3>Resources</h3>
              <a href="#">Documentation</a>
              <a href="#">API</a>
              <a href="#">Community</a>
              <a href="#">Blog</a>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <a href="#">Support</a>
              <a href="#">Partners</a>
              <a href="#">Careers</a>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Akshar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
