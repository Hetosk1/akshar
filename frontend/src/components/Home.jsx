import { useEther } from "../contexts/etherContext";
import { Navigate } from "react-router-dom";
import '../home.css';
import hero from '../images/1.png';
import workflow from '../images/workflow.png';

const Home = () => {
    const { address, isConnected, connectWallet } = useEther();
    
    if(isConnected != true) {
        return <Navigate to='/' replace/>
    }

    return (
      <div className="akshar-app">
        <main>
          <section className="hero container">
            <div className="hero-content">
              <h1>Decentralized file sharing with <span className="highlight">Akshar</span></h1>
              <p className="lead">Share your files securely using web3 technology. No central servers, no data breaches, just pure privacy and control over your content.</p>
              <div className="cta-buttons">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-outline">Learn More</button>
              </div>
            </div>
            <div className="hero-image">
              <img src={hero} alt="Akshar file sharing illustration" />
            </div>
          </section>
          
          <section className="container features-section">
            <h2 className="section-title">Powerful Features</h2>
            <div className="features">
              <div className="feature-card">
                <div className="feature-icon storage-icon"></div>
                <h3>Decentralized Storage</h3>
                <p>Your files are distributed across the network, ensuring no single point of failure and maximum uptime.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon encryption-icon"></div>
                <h3>End-to-End Encryption</h3>
                <p>Military-grade encryption keeps your files secure, with only you controlling access rights.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon rewards-icon"></div>
                <h3>Token Rewards</h3>
                <p>Earn Akshar tokens by sharing storage space or contributing to the network.</p>
              </div>
            </div>
          </section>
          
          <section className="container workflow-section">
            <h2 className="section-title">How Akshar Works</h2>
            <div className="workflow-container">
              <img src={workflow} alt="Akshar workflow diagram" className="workflow-image" />
            </div>
          </section>
          
          <section className="container testimonials-section">
            <h2 className="section-title">What Users Say</h2>
            <div className="testimonials">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Akshar has revolutionized how I share confidential documents with clients. The encryption and security features are outstanding."</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Alex Johnson</h4>
                    <p>Legal Consultant</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"As a researcher, I need reliable and secure file sharing. Akshar provides exactly that, plus the decentralized aspect gives me peace of mind."</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Samira Patel</h4>
                    <p>Research Scientist</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-section brand-section">
                <h3>Akshar</h3>
                <p>The future of decentralized file sharing, powered by web3 technology.</p>
                <div className="social-links">
                  <a href="#" className="social-icon twitter"></a>
                  <a href="#" className="social-icon discord"></a>
                  <a href="#" className="social-icon github"></a>
                </div>
              </div>
              <div className="footer-section">
                <h3>Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Whitepaper</a></li>
                  <li><a href="#">Tokenomics</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Resources</h3>
                <ul>
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">API</a></li>
                  <li><a href="#">Community</a></li>
                  <li><a href="#">Blog</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Contact</h3>
                <ul>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Partners</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
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