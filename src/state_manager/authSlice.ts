import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthData, Profile, Token, UserRegistration } from "../types/types";
import { refresh, signin, signup } from "../api/authApi";

type InitialStateType = {
  isAuth: boolean;
  isCreated: boolean;
  error: string;
  accessToken: string | null;
};

const initialState: InitialStateType = {
  isAuth: false,
  isCreated: false,
  error: "",
  accessToken: "",
};

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      return (await refresh(refreshToken)) as Token;
    } catch (error: any) {
      if (error.response.status === 401) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (userRegistrationData: UserRegistration, { rejectWithValue }) => {
    try {
      return (await signup(userRegistrationData)) as Profile;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signinThunk = createAsyncThunk(
  "auth/signin",
  async (authData: AuthData, { rejectWithValue }) => {
    try {
      return await signin(authData);
    } catch (error: any) {
      let errorMessage = error.response.data;
      if (error.status === 401) {
        errorMessage = "Неверные логин или пароль";
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.isCreated = true;
    }),
      builder.addCase(signupThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      }),
      builder.addCase(signinThunk.fulfilled, (state, action) => {
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
      }),
      builder.addCase(signinThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      }),
      builder.addCase(refreshThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.accessToken = action.payload?.accessToken || "";
      }),
      builder.addCase(refreshThunk.rejected, (state, action) => {
        state.accessToken = "";
        state.error = action.payload as string;
      });
  },
});

export const { setErrorMessage } = authSlice.actions;
export default authSlice.reducer;
