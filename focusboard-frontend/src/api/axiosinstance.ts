import axios from "axios";
import { logout } from "../utils/Logout";

const baseURL = import.meta.env.DEV ? "http://localhost:8000" : ""; // dev uses localhost backend, prod is same origin


const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      console.log("Refreshing token...");
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/refresh"); 
        const newAccessToken = refreshResponse.data.access_token;

        localStorage.setItem("access_token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest); 
      } catch (refreshErr) {
        console.error("Refresh failed, logging out");
        logout();
        return Promise.reject(refreshErr);
      }
    } else if (err.request) {
      console.error(`No response received for ${err.config.url}`);
    } else {
      console.error('Axios config error:', err.message);
    }

    return Promise.reject(err);
  }
);

export default api;
