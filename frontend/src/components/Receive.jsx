import { useEther } from "../contexts/etherContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";



const Receive = () => {

    const {address, isConnected, connectWallet } = useEther();
    
    if(!localStorage.getItem('address')) {
        return <Navigate to="/" replace/>;
    }

    console.log(address);

    return (
        <>
        Welcome to the Receive Page
        </>
    )

}

export default Receive;

