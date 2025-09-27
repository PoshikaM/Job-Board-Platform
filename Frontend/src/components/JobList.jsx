import React, { useState, useEffect } from "react";
import API from "../api";

function JobList() {
  const [jobs, setJobs] = useState([]);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchJobs();
  }, []);

  const applyForJob = async (jobId) => {
    try {
      console.log("Sending:", { user_id: userId, job_id: jobId });
      await API.post("/apply", { user_id: userId, job_id: jobId });
      alert("Applied successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to apply.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Available Jobs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <p className="text-gray-500 mt-2">
                  📍 {job.location}
                </p>
                <p className="text-gray-500">💰 {job.salary}</p>
              </div>
              <button
                onClick={() => applyForJob(job._id)}
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobList;