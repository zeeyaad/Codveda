import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

function Signup() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate("/login"); // go to login after signup
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
