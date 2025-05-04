import React, { useState, useEffect } from "react";
import API from "../api";

function MyApplications({ userId }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      const res = await API.get(`/my-applications/${userId}`);
      setApplications(res.data);
    }
    fetchApplications();
  }, [userId]);

  return (
    <div>
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((job, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;