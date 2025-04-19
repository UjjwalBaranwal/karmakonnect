import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

// Create context
const UserContext = createContext();

// Custom hook
export const useAuth = () => useContext(UserContext);

// Provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDNiOTRmMWVmYjMyNzhlOWUyNjc5MiIsImlhdCI6MTc0NTA4MTAyNywiZXhwIjoxNzUyODU3MDI3fQ.t02lWt7z3KlNgSfd24xQ2nDRIBXqAIN6cx1cxin4qEQ";
    return token ? { token } : null; // Set user based on token in local storage
  }); // user: { name, role, token }
  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      apiClient
        .get(`users/getMe`)
        .then((response) => {
          // Access user data directly from the response
          console.log(response.data.data.user);

          setUser(response.data.data.user);

          console.log("this is from the context");
        })
        .catch(() => {
          // If there's an error, remove the token and reset user
          localStorage.removeItem("authToken");
          setUser(null);
        });
    } else {
      console.log("localstorage is empty");
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
