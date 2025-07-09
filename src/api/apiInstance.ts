import axios from "axios";
import { store } from "../state_manager/store";
import { refreshThunk } from "../state_manager/authSlice";
import { apiConfig } from "./apiConfig";

export const apiInstance = axios.create({
  ...apiConfig,
});

apiInstance.interceptors.request.use(async (config) => {
  config.headers["Authorization"] = `Bearer ${
    store.getState().auth.accessToken
  }`;
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    try {
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        await store.dispatch(
          refreshThunk(localStorage.getItem("refreshToken") || "")
        );

        originalRequest.headers["Authorization"] = `Bearer ${
          store.getState().auth.accessToken
        }`;
        return apiInstance(originalRequest);
      }
      return Promise.reject(error);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
