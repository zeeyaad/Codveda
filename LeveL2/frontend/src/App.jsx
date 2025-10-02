import { Routes, Route } from "react-router-dom";
import Navbar from "./Shared Component/Navbar";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import Users from "./Pages/Users";  // create later
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Shared Component/ProtectedRoute";


function App() {
  const links = [
    { text: "Home", href: "/" },
    { text: "Products", href: "/products" },
    { text: "Users", href: "/users" },
    { text: "Signup", href: "/signup" },
    { text: "Login", href: "/login" }
  ];

  return (
    <>
      <Navbar brand="MyApp" links={links} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route: anyone logged in */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* Protected route: only admin */}
        <Route
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
