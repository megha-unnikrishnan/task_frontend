import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your backend URL
});

// Add Authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Request Config:", config); // Debug the request
  return config;
});

// Refresh token on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh: refreshToken }
          );
          const newAccessToken = response.data.access;
          localStorage.setItem("accessToken", newAccessToken);

          // Retry the failed request
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
