import apiClient from "../utils/apiClient";

// SignUp
export const signupNgo = async (ngoData) => {
  try {
    const response = await apiClient.post("ngo/signup", ngoData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "SignUp Failed"
    );
  }
};

// LogIn
export const loginNgo = async ({ email, password }) => {
  // console.log(email);
  // console.log(password);

  try {
    const response = await apiClient.post("ngo/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "Login failed"
    );
  }
};
