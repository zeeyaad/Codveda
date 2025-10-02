// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../Services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete API.defaults.headers.common["Authorization"];
    }

    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [token, role]);

  const login = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
