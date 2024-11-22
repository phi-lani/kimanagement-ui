import React, { useState } from "react";
import axios from "axios";

const WalletVerify = () => {
  const [message, setMessage] = useState("Please verify your wallet");
  const [error, setError] = useState(null);

  const signMessage = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, address],
        });

        // Verify the signature with the backend
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:8080/user/verifyWallet",
          { message, signature },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Wallet verified successfully!");
      } catch (err) {
        setError("Failed to verify wallet");
      }
    } else {
      setError("MetaMask not installed");
    }
  };

  return (
    <div>
      <p>{message}</p>
      <button onClick={signMessage}>Verify Wallet</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WalletVerify;
