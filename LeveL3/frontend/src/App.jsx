import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarsList from "./pages/CarList";
import Dashboard from "./pages/Dashboard";
import BookingForm from "./pages/BookingForm";
import Bookings from "./pages/Booking";
import ProtectedRoute from "./components/ProtectedRoute";
import { SocketProvider, useSocket } from "./context/SocketContext";
import Toast from "./components/Toast";
import CarDetails from "./pages/CarDetails";
import AdminDashboard from "./pages/AdminDashboard";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";


function AppContent() {
  const { toast } = useSocket();
  
  console.log("AppContent rendering...");
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cars" element={<CarsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

      <Route path="/cars/:id" element={<CarDetails />} style={{ margin: "2rem" }} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      </Routes>
      <WhatsAppButton />
      <Toast message={toast} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <AppContent />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
