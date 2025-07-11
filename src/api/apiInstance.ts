import axios from "axios";
import { store } from "../state_manager/store";
import { refreshThunk } from "../state_manager/authSlice";
import { apiConfig } from "./apiConfig";
import { accessTokenHelper } from "../utils/accessTokenHelper";

export const apiInstance = axios.create({
  ...apiConfig,
});

apiInstance.interceptors.request.use(async (config) => {
  config.headers[
    "Authorization"
  ] = `Bearer ${accessTokenHelper.getAccessToken()}`;
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

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${accessTokenHelper.getAccessToken()}`;
        return apiInstance(originalRequest);
      }
      return Promise.reject(error);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
