import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token is missing. Please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:8080/keyindividual/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Messages Response:", response.data);
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to fetch messages. Please try again.");
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Messages</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {messages.length > 0 ? (
        <ul className="list-group">
          {messages.map((message, index) => (
            <li key={index} className="list-group-item">
              <p><strong>From:</strong> {message.from}</p>
              <p><strong>Subject:</strong> {message.subject}</p>
              <p><strong>Body:</strong> {message.body}</p>
              <p><strong>Sent At:</strong> {message.sent_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
};

export default ViewMessages;
