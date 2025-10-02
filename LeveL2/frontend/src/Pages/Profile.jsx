import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        setUser(res.data);
        setForm({ username: res.data.username, password: "" });
      } catch {
        navigate("/login"); // if token invalid
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("/profile", form);
      setMessage("Profile updated!");
    } catch {
      setMessage("Failed to update profile");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
