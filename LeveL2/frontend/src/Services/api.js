// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000" // backend
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Auth
export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);

// ✅ Users
export const getUsers = () => API.get("/users");
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// ✅ Products
export const getProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;
