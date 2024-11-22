import React, { useState } from "react";
import axios from "axios";

const MetaMaskConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        setWalletAddress(address);

        // Save the wallet address to the backend
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:8080/startup/wallet/save",
          { wallet_address: address },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Wallet connected and saved successfully!");
      } catch (err) {
        setError("Failed to connect MetaMask");
      }
    } else {
      setError("MetaMask not installed");
    }
  };

  return (
    <div>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MetaMaskConnect;
