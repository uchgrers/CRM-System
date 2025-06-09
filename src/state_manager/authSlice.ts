import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile, UserRegistration } from "../types/types";
import { signup } from "../api/authApi";

type InitialStateType = {
    profile: Profile,
    error: string
}

const initialState: InitialStateType = {
    profile: {
        id: 0,
        username: '', 
        email: '',
        date: '',
        isBlocked: false,
        roles: [],
        phoneNumber: '',
    },
    error: ''
}

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async (userRegistrationData: UserRegistration, {rejectWithValue}) => {
        try {
            return await signup(userRegistrationData) as Profile
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(signupThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile.id = action.payload.id
                state.profile.username = action.payload.username
                state.profile.email = action.payload.email
                state.profile.date = action.payload.date
                state.profile.isBlocked = action.payload.isBlocked
                state.profile.roles = action.payload.roles
                state.profile.phoneNumber = action.payload.phoneNumber
            }
        }),
        builder.addCase(signupThunk.rejected, (state, action) => {
            state.error = action.payload as string
        })
    }
})

export const {setErrorMessage} = authSlice.actions
export default authSlice.reducer