import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" }); // your backend

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);


// Products API
export const getProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/products", data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
