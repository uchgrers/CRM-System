import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../types/types";
import { getProfile } from "../api/profileApi";

const initialState: Profile = {
  id: undefined,
  username: "",
  phoneNumber: "",
  date: "",
  email: "",
  isBlocked: false,
  roles: [],
};

export const getProfileThunk = createAsyncThunk(
  "/user/profile",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfile();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.date = action.payload.date;
      state.isBlocked = action.payload.isBlocked;
      state.roles = action.payload.roles;
      state.phoneNumber = action.payload.phoneNumber;
    });
  },
});

export default profileSlice.reducer;
