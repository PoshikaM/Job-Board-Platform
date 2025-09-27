import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import JobList from "./components/JobList";
import MyApplications from "./components/MyApplications";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/my-applications" element={<MyApplications userId={userId} />} />
      </Routes>
    </Router>
  );
}

export default App;