import React, { useState, useEffect } from "react";
import API from "../api";

function JobList() {
  const [jobs, setJobs] = useState([]);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    async function fetchJobs() {
      const res = await API.get("/jobs");
      setJobs(res.data);
    }
    fetchJobs();
  }, []);

  const applyForJob = async (jobId) => {
    try {
        console.log("Sending:", { user_id: userId, job_id: jobId })
      await API.post("/apply", { user_id: userId, job_id: jobId });
      alert("Applied successfully!");
    } catch (err) {
        console.log(err)
      alert("Failed to apply.");
    }
  };

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.map(job => (
        <div key={job._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          {/* {job._id ? <p>{job._id}</p> : "not found"} */}
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <button onClick={() => applyForJob(job._id)}>Apply</button>
        </div>
      ))}
    </div>
  );
}

export default JobList;