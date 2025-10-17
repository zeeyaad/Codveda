import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    price: "",
    availabilityType: "",
    description: "",
    images: [],
  });
  const [preview, setPreview] = useState([]);

  const fetchCars = async () => {
    try {
      console.log("Fetching cars...");
      const res = await API.get("/cars");
      console.log("Cars response:", res.data);
      const carsData = res.data.cars || res.data;
      console.log("Individual car data:", carsData.map(car => ({
        id: car.id,
        brand: car.brand,
        model: car.model,
        availabilityType: car.availabilityType,
        type: car.type
      })));
      setCars(carsData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand", form.brand);
    formData.append("model", form.model);
    formData.append("price", form.price);
    formData.append("availabilityType", form.availabilityType);
    formData.append("description", form.description);
    if (form.images && form.images.length > 0) {
      form.images.forEach((img) => formData.append("images", img));
    }

    await API.post("/cars", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setForm({ brand: "", model: "", price: "", availabilityType: "", description: "", images: [] });
    setPreview([]);
    fetchCars();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Car Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-wrap gap-2 mb-6 items-center"
      >
        <input
          type="text"
          placeholder="Brand"
          className="border p-2 rounded"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <input
          type="text"
          placeholder="Model"
          className="border p-2 rounded"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded w-28"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={form.availabilityType}
          onChange={(e) => setForm({ ...form, availabilityType: e.target.value })}
        >
          <option value="">Select Availability</option>
          <option value="rent">Rent Only</option>
          <option value="buy">Buy Only</option>
          <option value="both">Rent & Buy</option>
        </select>
        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setForm({ ...form, images: files });
            setPreview(files.map((file) => URL.createObjectURL(file)));
          }}
        />

        {/* Preview all selected images */}
        <div className="flex gap-2 mt-2">
          {preview &&
            preview.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Car
        </button>
      </form>

      {/* Car Table */}
      <div className="mb-4">
        <p>Total cars: {cars.length}</p>
        {cars.length === 0 && <p className="text-gray-500">No cars found. Add some cars using the form above.</p>}
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border rounded shadow p-3 flex flex-col items-center"
          >
            {car.images && car.images.length > 0 && (
              <img
                src={car.images[0]}
                alt={car.model}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="font-bold">
              {car.brand} {car.model}
            </h3>
            <p>${car.price}</p>
            <p>Availability: {car.availabilityType || car.type || "Not specified"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
