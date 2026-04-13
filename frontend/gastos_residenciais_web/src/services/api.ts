import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://localhost:5101/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;