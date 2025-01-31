import { useEther } from "../contexts/etherContext";
import { Navigate } from "react-router-dom";

const Home = () => {
    
    const { address, isConnected, connectWallet } = useEther();
    
    if(!localStorage.getItem('address')) {
        return <Navigate to='/' replace/>
    }

    console.log(address);
    return (
        <div>
            Home Component
        </div>
    );
}

export default Home;
