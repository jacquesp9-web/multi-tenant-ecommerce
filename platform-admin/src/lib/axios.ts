import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/";

export const Axios = axios.create({
  baseURL: baseURL,
});

Axios.interceptors.request.use((config) => {
  const accessToken = storage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

async function fetchRefreshToken(): Promise<string> {
  const refreshToken = storage.getRefreshToken();
  if (!refreshToken) {
    throw new Error("No Refresh Token Available");
  }

  const response = await axios.post<{
    accessToken: string;
    refreshToken: string;
  }>(`${baseURL}auth/refresh`, { refreshToken });

  const { accessToken, refreshToken: newRefreshToken } = response.data;

  storage.setToken(accessToken, newRefreshToken);
  return accessToken;
}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const AUTH_SKIP_URLS = ["/auth/login", "/auth/refresh"];

/* error code 401 - unauthorized access */
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;
    const url = originalRequest?.url ?? "";

    const hadAuthHeader = Boolean(originalRequest?.headers?.Authorization);

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest?._retry ||
      !hadAuthHeader ||
      AUTH_SKIP_URLS.some((skipUrl) => url.includes(skipUrl))
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /* calling the Refresh Token API */
    try {
      const newAccessToken = await fetchRefreshToken();

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return Axios(originalRequest);
    } catch (refreshError) {
      storage.clear();
      window.location.href = "/auth/login";
      return Promise.reject(refreshError);
    }
  },
);

export default Axios;
