// src/api/authService.js
import apiClient from "../utils/apiClient";

// SIGNUP
export const signup = async (userData) => {
  try {
    const response = await apiClient.post("user/signup", userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "Signup failed"
    );
  }
};

// LOGIN
export const login = async ({ email, password }) => {
  try {
    const response = await apiClient.post("user/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "Login failed"
    );
  }
};
