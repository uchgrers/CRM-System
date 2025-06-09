import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthData, Profile, Token, UserRegistration } from "../types/types";
import { signin, signup } from "../api/authApi";

type InitialStateType = {
    profile: Profile,
    error: string,
    created: boolean,
    token: Token
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
    error: '',
    created: false,
    token: {
        accessToken: '',
        refreshToken: ''
    }
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

export const signinThunk = createAsyncThunk(
    'auth/signin',
    async (authData: AuthData, {rejectWithValue}) => {
        try {
            return await signin(authData) as Token
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

                state.created = true
            }
        }),
        builder.addCase(signupThunk.rejected, (state, action) => {
            state.error = action.payload as string
        }),
        builder.addCase(signinThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state.token = action.payload
            }
        }),
        builder.addCase(signinThunk.rejected, (state, action) => {
            state.error = action.payload as string
        })
    }
})

export const {setErrorMessage} = authSlice.actions
export default authSlice.reducer