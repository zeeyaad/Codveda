import { useEffect, useState } from "react";
import API from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th>Car</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border">
                <td>
                  {b.Car.brand} {b.Car.model}
                </td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
