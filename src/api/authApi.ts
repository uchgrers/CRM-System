import axios from "axios";
import { AuthData, Profile, Token, UserRegistration } from "../types/types";
import { apiInstance } from "./apiInstance";

export const signup = async (userData: UserRegistration) => {
  try {
    const result = await apiInstance.post<Profile | string>("auth/signup", userData);
    return result.data;
  } catch (error: any) {
    throw error
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
  try {
    const result = await apiInstance.post<string>("user/logout");
    return result.data;
  } catch (error) {
    throw error;
  }
};
