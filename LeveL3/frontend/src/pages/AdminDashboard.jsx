import { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await API.get("/admin/dashboard");
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();

    // 🔁 Listen for live updates
    socket.on("updateDashboard", (data) => {
      console.log("Dashboard update:", data);
      fetchStats(); // reload stats when triggered
    });

    return () => socket.off("updateDashboard");
  }, []);

  if (!stats) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard (Live)</h2>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card label="Total Cars" value={stats.totalCars} />
        <Card label="Rent Cars" value={stats.rentCars} />
        <Card label="Buy Cars" value={stats.buyCars} />
        <Card label="Both" value={stats.bothCars} />
        <Card label="Users" value={stats.totalUsers} />
        <Card label="Bookings" value={stats.totalBookings} />
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Cars Added Per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.carsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickFormatter={(m) => m.slice(0, 7)} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
