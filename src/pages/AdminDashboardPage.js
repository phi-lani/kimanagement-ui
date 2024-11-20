import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboardPage = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/viewUnverifiedDocuments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDocuments(response.data);
      } catch (error) {
        alert('Failed to fetch documents.');
      }
    };
    fetchDocuments();
  }, []);

  const handleVerify = async (id, verified) => {
    try {
      await axios.post(
        'http://localhost:8080/admin/verifyDocument',
        { document_id: id, verified },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`Document ${verified ? 'verified' : 'rejected'} successfully.`);
      setDocuments((docs) => docs.filter((doc) => doc.id !== id));
    } catch (error) {
      alert('Verification failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      {documents.length > 0 ? (
        documents.map((doc) => (
          <div key={doc.id} className="border p-3 mb-3">
            <p>Document Type: {doc.documentType}</p>
            <button onClick={() => handleVerify(doc.id, true)} className="btn btn-success me-2">Verify</button>
            <button onClick={() => handleVerify(doc.id, false)} className="btn btn-danger">Reject</button>
          </div>
        ))
      ) : (
        <p>No unverified documents available.</p>
      )}
    </div>
  );
};

export default AdminDashboardPage;
