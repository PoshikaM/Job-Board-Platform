import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import JobList from "./components/JobList";
import MyApplications from "./components/MyApplications";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup">Signup</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/jobs">Jobs</Link> | 
          <Link to="/my-applications">My Applications</Link>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/jobs" element={<JobList userId={userId} />} />
          <Route path="/my-applications" element={<MyApplications userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;