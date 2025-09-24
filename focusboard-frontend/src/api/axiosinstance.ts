import axios from "axios";
import { logout } from "../utils/Logout";

const baseURL =
  import.meta.env.VITE_API_BASE ??
  (import.meta.env.DEV
    ? "http://localhost:8000"                     
    : "https://focusboard.onrender.com"); 

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
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token in storage");

        const refreshResponse = await api.post("/refresh", { refresh_token: refreshToken });
        const newAccessToken = refreshResponse.data.access_token;

        localStorage.setItem("access_token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh issue, logging out");
        logout();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);


export default api;
