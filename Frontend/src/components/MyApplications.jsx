import React, { useState, useEffect } from "react";
import API from "../api";

function MyApplications({ userId }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await API.get(`/my-applications/${userId}`);
        setApplications(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchApplications();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          My Applications
        </h2>
        {applications.length === 0 ? (
          <p className="text-gray-600 text-center">No applications yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {applications.map((job, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <p className="text-gray-500 mt-2">📍 {job.location}</p>
                <p className="text-gray-500">💰 {job.salary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;