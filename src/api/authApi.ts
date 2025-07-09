import { AuthData, Profile, Token, UserRegistration } from "../types/types";
import { apiInstance } from "./apiInstance";
import { refreshInstance } from "./refreshInstance";

export const signup = async (userData: UserRegistration) => {
  try {
    const result = await apiInstance.post<Profile | string>(
      "auth/signup",
      userData
    );
    return result.data;
  } catch (error: any) {
    throw error;
  }
};

export const signin = async (authData: AuthData) => {
  try {
    const result = await apiInstance.post<Token>("auth/signin", authData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  return await apiInstance.post<string>("user/logout");
};

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
