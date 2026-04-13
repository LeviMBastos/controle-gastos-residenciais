import axios from "axios";
import type { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5101/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;