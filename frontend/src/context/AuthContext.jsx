import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored User:", storedUser);
  
    if (storedUser && storedUser._id) {
      setUser(storedUser);
      setRole(storedUser.role);
      setUserId(storedUser._id);
      console.log("User ID Set:", storedUser._id);
    } else {
      setUserId(null);
      console.log("User ID not found in storage");
    }
  }, []);

  // Register function
  const register = async (name, email, password, role) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      return { success: true, message: "Registration successful" };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setRole(data.role);
      setUserId(data._id);
      console.log("User ID after login:", data._id);
      return { success: true, role: data.role };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    setUserId(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, userId, role, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;