


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UnverifiedDocuments = () => {
//   const [documents, setDocuments] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/admin/viewUnverifiedDocuments", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDocuments(response.data);
//       } catch (err) {
//         setError("Failed to load unverified documents");
//       }
//     };

//     fetchDocuments();
//   }, []);

//   const handleViewDocument = async (documentID) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`http://localhost:8080/downloadDocument?documentID=${documentID}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         responseType: "blob", // Expect binary data for the document
//       });

//       // Create a link and trigger a download
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "document.pdf"); // Use a dynamic filename if needed
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       setError("Failed to view the document");
//     }
//   };

//   const handleApproveDocument = async (documentID, approved) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:8080/admin/verifyDocument",
//         { document_id: documentID, approved },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(approved ? "Document approved successfully!" : "Document rejected!");
//       setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== documentID)); // Remove the document from the list
//     } catch (err) {
//       setError("Failed to update document status");
//     }
//   };

//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Unverified Documents</h1>
//       {documents.length > 0 ? (
//         <ul className="list-group">
//           {documents.map((doc) => (
//             <li key={doc.id} className="list-group-item">
//               <p><strong>ID:</strong> {doc.id}</p>
//               <p><strong>User ID:</strong> {doc.user_id}</p>
//               <p><strong>Document Type:</strong> {doc.document_type}</p>
//               <p><strong>Uploaded At:</strong> {new Date(doc.uploaded_at).toLocaleString()}</p>
//               <button className="btn btn-primary me-2" onClick={() => handleViewDocument(doc.id)}>
//                 View Document
//               </button>
//               <button className="btn btn-success me-2" onClick={() => handleApproveDocument(doc.id, true)}>
//                 Approve
//               </button>
//               <button className="btn btn-danger" onClick={() => handleApproveDocument(doc.id, false)}>
//                 Reject
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No unverified documents found.</p>
//       )}
//     </div>
//   );
// };

// export default UnverifiedDocuments;


import React, { useState, useEffect } from "react";
import axios from "axios";

const UnverifiedDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch unverified documents when the component mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/admin/viewUnverifiedDocuments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocuments(response.data);
      } catch (err) {
        setError("Failed to load unverified documents");
      }
    };

    fetchDocuments();
  }, []);

  // Function to handle viewing the document
  const handleViewDocument = async (documentID) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/downloadDocument?documentID=${documentID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Expect binary data for the document
        }
      );

      // Create a link and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `document_${documentID}.pdf`); // Dynamic filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Failed to view the document");
    }
  };

  // Function to handle approving or rejecting the document
  const handleApproveDocument = async (documentID, isVerified) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/admin/verifyDocument",
        { document_id: documentID, verified: isVerified }, // Correct key: `verified`
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(isVerified ? "Document approved successfully!" : "Document rejected!");
      setDocuments((prevDocs) =>
        prevDocs.filter((doc) => doc.id !== documentID)
      ); // Remove the document from the list
    } catch (err) {
      setError("Failed to update document status");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Unverified Documents</h1>
      {documents.length > 0 ? (
        <ul className="list-group">
          {documents.map((doc) => (
            <li key={doc.id} className="list-group-item">
              <p>
                <strong>ID:</strong> {doc.id}
              </p>
              <p>
                <strong>User ID:</strong> {doc.user_id}
              </p>
              <p>
                <strong>Document Type:</strong> {doc.document_type}
              </p>
              <p>
                <strong>Uploaded At:</strong>{" "}
                {new Date(doc.uploaded_at).toLocaleString()}
              </p>
              <button
                className="btn btn-primary me-2"
                onClick={() => handleViewDocument(doc.id)}
              >
                View Document
              </button>
              <button
                className="btn btn-success me-2"
                onClick={() => handleApproveDocument(doc.id, true)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleApproveDocument(doc.id, false)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No unverified documents found.</p>
      )}
    </div>
  );
};

export default UnverifiedDocuments;
