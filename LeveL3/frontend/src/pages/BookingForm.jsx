import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [form, setForm] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    API.get(`/cars/${id}`).then((res) => setCar(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/bookings", { carId: id, ...form });
    navigate("/my-bookings");
  };

  if (!car) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {car.brand} {car.model}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Start Date:
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="border p-2 w-full"
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="border p-2 w-full"
          />
        </label>
        <button className="bg-green-600 text-white py-2 rounded">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
