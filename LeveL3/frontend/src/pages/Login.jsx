import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await API.post("/auth/login", { email, password });
      console.log("Login response:", res.data); // Debug log
      
      const userData = { token: res.data.token, user: res.data.user };
      console.log("Storing user data:", userData);
      login(userData);
      
      // Debug: Check user data after login
      console.log("User data after login:", res.data.user);
      console.log("User role:", res.data.user?.role);
      
      // Check if user is admin and redirect to Dashboard
      if (res.data.user && res.data.user.role === "admin") {
        console.log("Redirecting to admin dashboard");
        navigate("/admin");
      } else {
        console.log("Redirecting to home page");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data); // Debug log
      setError(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-80"
      >
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="bg-blue-500 text-white w-full py-2 rounded">
          Login
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
