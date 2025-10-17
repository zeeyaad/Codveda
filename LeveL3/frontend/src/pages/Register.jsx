import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      console.log("Registering user...");
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user" // Normal user role
      });
      
      console.log("Registration response:", res.data);
      
      // Auto-login after registration
      const loginRes = await API.post("/auth/login", {
        email: form.email,
        password: form.password
      });
      
      const userData = { token: loginRes.data.token, user: loginRes.data.user };
      login(userData);
      
      console.log("User registered and logged in successfully");
      navigate("/");
      
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border p-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border p-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              className="border p-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border p-3 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
