import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login({ setUserId }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      const userId = res.data.user_id;

    // ✅ Store in localStorage
    localStorage.setItem("user_id", userId);
      alert("Login successful!");
      setUserId(res.data.user_id);
      navigate("/jobs");
    } catch (err) {
        console.log(err)
      alert("Login failed.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;