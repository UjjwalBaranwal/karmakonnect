import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

// Create context
const UserContext = createContext();

// Cu
// Provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null; // Set user based on token in local storage
  }); // user: { name, role, token }
  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      apiClient
        .get(`user/me`)
        .then((response) => {
          // Access user data directly from the response
          console.log(response.data.data.user);

          setUser(response.data.data.user);

          console.log("this is from the context");
        })
        .catch(() => {
          // If there's an error, remove the token and reset user
          // localStorage.removeItem("token");
          console.log("in user context cathc block");

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
