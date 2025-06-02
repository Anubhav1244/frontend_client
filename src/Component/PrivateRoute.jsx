import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ works correctly


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    console.log(decoded.exp);

    const currentTime = Date.now() / 1000; // in seconds
    console.log(currentTime);
    console.log(decoded.exp < currentTime);
    if (decoded.exp < currentTime) {
      // Token expired
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    return children;
  } catch (err) {
    // Invalid token
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
