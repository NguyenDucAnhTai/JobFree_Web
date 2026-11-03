import { axiosInstance } from "./axios.config";

export const httpClient = {
  get: async <T>(url: string, config?: Parameters<typeof axiosInstance.get>[1]) => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  post: async <T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: Parameters<typeof axiosInstance.post>[2],
  ) => {
    const response = await axiosInstance.post<T>(url, body, config);
    return response.data;
  },

  put: async <T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: Parameters<typeof axiosInstance.put>[2],
  ) => {
    const response = await axiosInstance.put<T>(url, body, config);
    return response.data;
  },

  patch: async <T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: Parameters<typeof axiosInstance.patch>[2],
  ) => {
    const response = await axiosInstance.patch<T>(url, body, config);
    return response.data;
  },

  delete: async <T>(
    url: string,
    config?: Parameters<typeof axiosInstance.delete>[1],
  ) => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};
