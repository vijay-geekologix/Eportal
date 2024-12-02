import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const httpClient = axios.create({
  baseURL: "https://p4h4d07h-4000.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authToken = localStorage.getItem("authToken"); // Or fetch from cookies
    if (authToken) {
      // Ensure headers are defined and modify them safely
      config.headers = config.headers || {}; // Initialize headers if undefined 
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define common HTTP methods
const api = {
  get: <T>(url: string, params?: Record<string, unknown>): Promise<AxiosResponse<T>> =>
    httpClient.get<T>(url, { params }),
  post: <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
    httpClient.post<T>(url, data),
  put: <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
    httpClient.put<T>(url, data),
  delete: <T>(url: string): Promise<AxiosResponse<T>> =>
    httpClient.delete<T>(url),
};

export default api;
