import axios from "axios";
import { Token } from "../types/types";
import { store } from "../state_manager/store";
import { logoutUser, refreshThunk } from "../state_manager/authSlice";

export const apiInstance = axios.create({
  baseURL: "https://easydev.club/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshInstance = axios.create({
  baseURL: "https://easydev.club/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const refresh = async (refreshToken: string) => {
  try {
    const result = await refreshInstance.post<Token>("auth/refresh", {
      refreshToken: refreshToken,
    });
    localStorage.setItem("refreshToken", result.data.refreshToken);
    return result.data;
  } catch (error) {
    throw error;
  }
};

apiInstance.interceptors.request.use(async (config) => {
  if (!localStorage.getItem("refreshToken")) {
    store.dispatch(logoutUser());
  }

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
