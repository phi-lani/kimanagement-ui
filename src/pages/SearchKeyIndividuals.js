// import React, { useState } from "react";
// import axios from "axios";

// const SearchKeyIndividuals = () => {
//   const [qualifications, setQualifications] = useState("");
//   const [experience, setExperience] = useState("");
//   const [area, setArea] = useState("");
//   const [classOfBusiness, setClassOfBusiness] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     setError(null);

//     // Build the payload with only non-empty fields
//     const payload = {};
//     if (qualifications) payload.qualifications = qualifications.split(",").map((q) => q.trim());
//     if (experience) payload.experience = experience.split(",").map((e) => e.trim());
//     if (area) payload.area = area.trim();
//     if (classOfBusiness) payload.class_of_business = classOfBusiness.split(",").map((cob) => cob.trim());

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       // Make the API call
//       const response = await axios.get("http://localhost:8080/startup/searchKeyIndividuals", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: payload, // Pass the payload as query params
//       });

//       setResults(response.data);
//     } catch (err) {
//       console.error("Error during search:", err);
//       setError("Failed to fetch search results. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Search Key Individuals</h1>
//       <div>
//         <input
//           className="form-control mb-3"
//           placeholder="Qualifications (comma-separated)"
//           value={qualifications}
//           onChange={(e) => setQualifications(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Experience (comma-separated)"
//           value={experience}
//           onChange={(e) => setExperience(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Area"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Class of Business (comma-separated)"
//           value={classOfBusiness}
//           onChange={(e) => setClassOfBusiness(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {error && <div className="alert alert-danger mt-3">{error}</div>}
//       <div className="mt-4">
//         <h2>Search Results:</h2>
//         {results.length > 0 ? (
//           <ul className="list-group">
//             {results.map((individual, index) => (
//               <li key={index} className="list-group-item">
//                 <p><strong>Full Name:</strong> {individual.FullName}</p>
//                 <p><strong>Qualifications:</strong> {individual.Qualifications.join(", ")}</p>
//                 <p><strong>Experience:</strong> {individual.Experience.join(", ")}</p>
//                 <p><strong>Area:</strong> {individual.Area}</p>
//                 <p><strong>Class of Business:</strong> {individual.ClassOfBusiness.join(", ")}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchKeyIndividuals;


// // ==============================================================
// import React, { useState } from "react";
// import axios from "axios";

// const SearchKeyIndividuals = () => {
//   const [qualifications, setQualifications] = useState("");
//   const [experience, setExperience] = useState("");
//   const [area, setArea] = useState("");
//   const [classOfBusiness, setClassOfBusiness] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [showEmailFormForId, setShowEmailFormForId] = useState(null); // Track which email form to show
//   const [emailDetails, setEmailDetails] = useState({
//     subject: "",
//     body: "",
//   });

//   const handleSearch = async () => {
//     setError(null);

//     // Build the payload with only non-empty fields
//     const payload = {};
//     if (qualifications) payload.qualifications = qualifications.split(",").map((q) => q.trim());
//     if (experience) payload.experience = experience.split(",").map((e) => e.trim());
//     if (area) payload.area = area.trim();
//     if (classOfBusiness) payload.class_of_business = classOfBusiness.split(",").map((cob) => cob.trim());

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       // Make the API call
//       const response = await axios.get("http://localhost:8080/startup/searchKeyIndividuals", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: payload, // Pass the payload as query params
//       });

//       setResults(response.data);
//     } catch (err) {
//       console.error("Error during search:", err);
//       setError("Failed to fetch search results. Please try again.");
//     }
//   };

//   const handleEmailChange = (e) => {
//     const { name, value } = e.target;
//     setEmailDetails({ ...emailDetails, [name]: value });
//   };

//   const handleSendEmail = async (recipientId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       // Make the API call to send the email
//       await axios.post(
//         "http://localhost:8080/startup/sendMessage",
//         {
//           recipient_id: recipientId,
//           subject: emailDetails.subject,
//           body: emailDetails.body,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Email sent successfully!");
//       setShowEmailFormForId(null); // Hide the email form after sending
//     } catch (err) {
//       console.error("Error sending email:", err);
//       alert("Failed to send email. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Search Key Individuals</h1>
//       <div>
//         <input
//           className="form-control mb-3"
//           placeholder="Qualifications (comma-separated)"
//           value={qualifications}
//           onChange={(e) => setQualifications(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Experience (comma-separated)"
//           value={experience}
//           onChange={(e) => setExperience(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Area"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Class of Business (comma-separated)"
//           value={classOfBusiness}
//           onChange={(e) => setClassOfBusiness(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {error && <div className="alert alert-danger mt-3">{error}</div>}
//       <div className="mt-4">
//         <h2>Search Results:</h2>
//         {results.length > 0 ? (
//           <ul className="list-group">
//             {results.map((individual, index) => (
//               <li key={index} className="list-group-item">
//                 <p><strong>Full Name:</strong> {individual.FullName}</p>
//                 <p><strong>Qualifications:</strong> {individual.Qualifications.join(", ")}</p>
//                 <p><strong>Experience:</strong> {individual.Experience.join(", ")}</p>
//                 <p><strong>Area:</strong> {individual.Area}</p>
//                 <p><strong>Class of Business:</strong> {individual.ClassOfBusiness.join(", ")}</p>
//                 <button
//                   className="btn btn-success mt-2"
//                   onClick={() => setShowEmailFormForId(individual.ID)}
//                 >
//                   Send Email
//                 </button>
//                 {showEmailFormForId === individual.ID && (
//                   <div className="mt-3">
//                     <input
//                       className="form-control mb-2"
//                       name="subject"
//                       placeholder="Email Subject"
//                       value={emailDetails.subject}
//                       onChange={handleEmailChange}
//                     />
//                     <textarea
//                       className="form-control mb-2"
//                       name="body"
//                       placeholder="Email Body"
//                       value={emailDetails.body}
//                       onChange={handleEmailChange}
//                     />
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleSendEmail(individual.ID)}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchKeyIndividuals;

// import React, { useState } from "react";
// import axios from "axios";

// const SearchKeyIndividuals = () => {
//   const [qualifications, setQualifications] = useState("");
//   const [experience, setExperience] = useState("");
//   const [area, setArea] = useState("");
//   const [classOfBusiness, setClassOfBusiness] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [emailDetails, setEmailDetails] = useState({
//     subject: "",
//     body: "",
//   });
//   const [showEmailFormForId, setShowEmailFormForId] = useState(null);

//   const handleSearch = async () => {
//     setError(null);

//     // Build the payload with only non-empty fields
//     const payload = {};
//     if (qualifications) payload.qualifications = qualifications.split(",").map((q) => q.trim());
//     if (experience) payload.experience = experience.split(",").map((e) => e.trim());
//     if (area) payload.area = area.trim();
//     if (classOfBusiness) payload.class_of_business = classOfBusiness.split(",").map((cob) => cob.trim());

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       // Make the API call
//       const response = await axios.get("http://localhost:8080/startup/searchKeyIndividuals", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: payload, // Pass the payload as query params
//       });

//       setResults(response.data);
//     } catch (err) {
//       console.error("Error during search:", err);
//       setError("Failed to fetch search results. Please try again.");
//     }
//   };

//   const handleEmailChange = (e) => {
//     const { name, value } = e.target;
//     setEmailDetails({ ...emailDetails, [name]: value });
//   };

//   const handleSendEmail = async (recipientId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       const payload = {
//         recipient_id: recipientId,
//         subject: emailDetails.subject,
//         body: emailDetails.body,
//       };

//       await axios.post("http://localhost:8080/startup/sendMessage", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Email sent successfully!");
//       setShowEmailFormForId(null);
//     } catch (err) {
//       console.error("Error sending email:", err);
//       alert("Failed to send email. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Search Key Individuals</h1>
//       <div>
//         <input
//           className="form-control mb-3"
//           placeholder="Qualifications (comma-separated)"
//           value={qualifications}
//           onChange={(e) => setQualifications(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Experience (comma-separated)"
//           value={experience}
//           onChange={(e) => setExperience(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Area"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Class of Business (comma-separated)"
//           value={classOfBusiness}
//           onChange={(e) => setClassOfBusiness(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {error && <div className="alert alert-danger mt-3">{error}</div>}
//       <div className="mt-4">
//         <h2>Search Results:</h2>
//         {results.length > 0 ? (
//           <ul className="list-group">
//             {results.map((individual, index) => (
//               <li key={index} className="list-group-item">
//                 <p>
//                   <strong>Full Name:</strong> {individual.FullName}
//                 </p>
//                 <p>
//                   <strong>Qualifications:</strong> {individual.Qualifications.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Experience:</strong> {individual.Experience.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Area:</strong> {individual.Area}
//                 </p>
//                 <p>
//                   <strong>Class of Business:</strong> {individual.ClassOfBusiness.join(", ")}
//                 </p>
//                 <button
//                   className="btn btn-success mt-2"
//                   onClick={() => setShowEmailFormForId(individual.ID)}
//                 >
//                   Send Email
//                 </button>
//                 {showEmailFormForId === individual.ID && (
//                   <div className="mt-3">
//                     <input
//                       className="form-control mb-2"
//                       name="subject"
//                       placeholder="Email Subject"
//                       value={emailDetails.subject}
//                       onChange={handleEmailChange}
//                     />
//                     <textarea
//                       className="form-control mb-2"
//                       name="body"
//                       placeholder="Email Body"
//                       value={emailDetails.body}
//                       onChange={handleEmailChange}
//                     />
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleSendEmail(individual.ID)}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchKeyIndividuals;


// import React, { useState } from "react";
// import axios from "axios";

// const SearchKeyIndividuals = () => {
//   const [qualifications, setQualifications] = useState("");
//   const [experience, setExperience] = useState("");
//   const [area, setArea] = useState("");
//   const [classOfBusiness, setClassOfBusiness] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [emailDetails, setEmailDetails] = useState({
//     subject: "",
//     body: "",
//   });
//   const [showEmailFormForId, setShowEmailFormForId] = useState(null);

//   const handleSearch = async () => {
//     setError(null);

//     // Build the payload with only non-empty fields
//     const payload = {};
//     if (qualifications) payload.qualifications = qualifications.split(",").map((q) => q.trim());
//     if (experience) payload.experience = experience.split(",").map((e) => e.trim());
//     if (area) payload.area = area.trim();
//     if (classOfBusiness) payload.class_of_business = classOfBusiness.split(",").map((cob) => cob.trim());

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       // Make the API call
//       const response = await axios.get("http://localhost:8080/startup/searchKeyIndividuals", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: payload, // Pass the payload as query params
//       });

//       // Log the raw response from the API
//       console.log("API Response:", response.data);

//       setResults(response.data);
//     } catch (err) {
//       console.error("Error during search:", err);
//       setError("Failed to fetch search results. Please try again.");
//     }
//   };

//   const handleEmailChange = (e) => {
//     const { name, value } = e.target;
//     setEmailDetails({ ...emailDetails, [name]: value });
//   };

//   const handleSendEmail = async (recipientId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Authentication token is missing. Please log in again.");
//         return;
//       }

//       const payload = {
//         recipient_id: recipientId,
//         subject: emailDetails.subject,
//         body: emailDetails.body,
//       };

//       await axios.post("http://localhost:8080/startup/sendMessage", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Email sent successfully!");
//       setShowEmailFormForId(null);
//     } catch (err) {
//       console.error("Error sending email:", err);
//       alert("Failed to send email. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Search Key Individuals</h1>
//       <div>
//         <input
//           className="form-control mb-3"
//           placeholder="Qualifications (comma-separated)"
//           value={qualifications}
//           onChange={(e) => setQualifications(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Experience (comma-separated)"
//           value={experience}
//           onChange={(e) => setExperience(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Area"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Class of Business (comma-separated)"
//           value={classOfBusiness}
//           onChange={(e) => setClassOfBusiness(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {error && <div className="alert alert-danger mt-3">{error}</div>}
//       <div className="mt-4">
//         <h2>Search Results:</h2>
//         {results.length > 0 ? (
//           <ul className="list-group">
//             {results.map((individual, index) => {
//               // Log individual information for debugging
//               console.log("Key Individual Information:", individual);

//               return (
//                 <li key={index} className="list-group-item">
//                   <p>
//                     <strong>Full Name:</strong> {individual.FullName}
//                   </p>
//                   <p>
//                     <strong>Qualifications:</strong> {individual.Qualifications.join(", ")}
//                   </p>
//                   <p>
//                     <strong>Experience:</strong> {individual.Experience.join(", ")}
//                   </p>
//                   <p>
//                     <strong>Area:</strong> {individual.Area}
//                   </p>
//                   <p>
//                     <strong>Class of Business:</strong> {individual.ClassOfBusiness.join(", ")}
//                   </p>
//                   <button
//                     className="btn btn-success mt-2"
//                     onClick={() => setShowEmailFormForId(individual.UserID)}
//                   >
//                     Send Email
//                   </button>
//                   {showEmailFormForId === individual.UserID && (
//                     <div className="mt-3">
//                       <input
//                         className="form-control mb-2"
//                         name="subject"
//                         placeholder="Email Subject"
//                         value={emailDetails.subject}
//                         onChange={handleEmailChange}
//                       />
//                       <textarea
//                         className="form-control mb-2"
//                         name="body"
//                         placeholder="Email Body"
//                         value={emailDetails.body}
//                         onChange={handleEmailChange}
//                       />
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => handleSendEmail(individual.ID)}
//                       >
//                         Send
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchKeyIndividuals;



import React, { useState } from "react";
import axios from "axios";

const SearchKeyIndividuals = () => {
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [area, setArea] = useState("");
  const [classOfBusiness, setClassOfBusiness] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [emailDetails, setEmailDetails] = useState({
    subject: "",
    body: "",
  });
  const [showEmailFormForId, setShowEmailFormForId] = useState(null); // To track the email form

  // Handle API call to search for Key Individuals
  const handleSearch = async () => {
    setError(null);

    // Build the payload with only non-empty fields
    const payload = {};
    if (qualifications) payload.qualifications = qualifications.split(",").map((q) => q.trim());
    if (experience) payload.experience = experience.split(",").map((e) => e.trim());
    if (area) payload.area = area.trim();
    if (classOfBusiness) payload.class_of_business = classOfBusiness.split(",").map((cob) => cob.trim());

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      // Make the API call
      const response = await axios.get("http://localhost:8080/startup/searchKeyIndividuals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: payload, // Pass the payload as query params
      });

      // Log the full API response for debugging
      console.log("API Response:", response.data);
      setResults(response.data);
    } catch (err) {
      console.error("Error during search:", err);
      setError("Failed to fetch search results. Please try again.");
    }
  };

  // Handle input changes for email form
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails({ ...emailDetails, [name]: value });
  };

  // Handle API call to send an email
  const handleSendEmail = async (recipientId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      const payload = {
        recipient_id: recipientId,
        subject: emailDetails.subject,
        body: emailDetails.body,
      };

      // Log the payload being sent to the API
      console.log("Email Payload:", payload);

      // Make the API call
      const response = await axios.post("http://localhost:8080/startup/sendMessage", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the API response for sending email
      console.log("Email API Response:", response.data);
      alert("Email sent successfully!");
      setShowEmailFormForId(null); // Close the email form
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Key Individuals</h1>
      <div>
        <input
          className="form-control mb-3"
          placeholder="Qualifications (comma-separated)"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Experience (comma-separated)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Class of Business (comma-separated)"
          value={classOfBusiness}
          onChange={(e) => setClassOfBusiness(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <div className="mt-4">
        <h2>Search Results:</h2>
        {results.length > 0 ? (
          <ul className="list-group">
            {results.map((individual, index) => (
              <li key={index} className="list-group-item">
                <p><strong>Full Name:</strong> {individual.FullName}</p>
                <p><strong>Qualifications:</strong> {individual.Qualifications.join(", ")}</p>
                <p><strong>Experience:</strong> {individual.Experience.join(", ")}</p>
                <p><strong>Area:</strong> {individual.Area}</p>
                <p><strong>Class of Business:</strong> {individual.ClassOfBusiness.join(", ")}</p>

                <button
                  className="btn btn-success mt-2"
                  onClick={() => setShowEmailFormForId(individual.ID)}
                >
                  Send Email
                </button>

                {showEmailFormForId === individual.ID && (
                  <div className="mt-3">
                    <input
                      className="form-control mb-2"
                      name="subject"
                      placeholder="Email Subject"
                      value={emailDetails.subject}
                      onChange={handleEmailChange}
                    />
                    <textarea
                      className="form-control mb-2"
                      name="body"
                      placeholder="Email Body"
                      value={emailDetails.body}
                      onChange={handleEmailChange}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSendEmail(individual.ID)}
                    >
                      Send
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchKeyIndividuals;
