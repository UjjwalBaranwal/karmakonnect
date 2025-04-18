// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/", // Replace with your API base URL
  timeout: 10000, // Timeout for requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add headers or modify the config before the request is sent
    const token = localStorage.getItem("token"); // Get the token from localStorage or context
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers if available
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can handle the response here (e.g., logging, transforming data)
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.error("Unauthorized access - please log in.");
      // Optionally, clear the stored token and redirect to login
      localStorage.removeItem("token");
      // window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error); // Handle other errors
  }
);

export default apiClient;
