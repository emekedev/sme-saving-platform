import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const register = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

   if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;