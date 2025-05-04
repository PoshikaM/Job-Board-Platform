import React, { useState } from "react";
import API from "../api";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/signup", form);
      alert("Signup successful! Now login.");
    } catch (err) {
        console.log(err)
      alert("Signup failed.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;