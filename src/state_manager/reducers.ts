import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";

export const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice
})