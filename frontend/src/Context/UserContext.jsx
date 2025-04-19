import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { name, role, token }

  const login = (userData) => {
    setUser(userData);
    // You can also save token to localStorage/sessionStorage here
  };

  const logout = () => {
    setUser(null);
    // Clear token from storage too
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
