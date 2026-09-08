import axios from "axios";
import { ENV } from "../config";

export const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 20_000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
);
