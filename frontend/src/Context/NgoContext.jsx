import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

const NgoContext = createContext();

const NgoProvider = ({ children }) => {
  const [ngo, setNgo] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });
  console.log(ngo);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient
        .get("ngo/me")
        .then((res) => {
          console.log("inside here ");
          setNgo(res.data.data.ngo);
          console.log(res.data.data.ngo);
        })
        .catch(() => {
          // localStorage.removeItem("token");
          console.log("in catch");

          // setNgo(null);
        });
    } else console.log("storage is empty");
  }, []);

  return (
    <NgoContext.Provider value={{ ngo, setNgo }}>
      {children}
    </NgoContext.Provider>
  );
};

function useNgo() {
  const context = useContext(NgoContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { NgoProvider, useNgo };
