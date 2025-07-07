import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const getProfileThunk = createAsyncThunk(
    '/user/profile',
    async () => {
        try {
            
        } catch (error) {
            
        }
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: builder => {

    }
})