import { AuthData, UserRegistration } from "../types/types"
import { apiInstance } from "./apiInstance"

export const signup = async (userData: UserRegistration) => {
    try {
        const result = await apiInstance.post('auth/signup', userData)
        console.log(result)
        return result.data
    } catch (error: any) {
        console.log(error)
        throw error
    }
}

export const signin = async (authData: AuthData) => {
    try {
        const result = await apiInstance.post('auth/signin', authData)
        return result.data
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        const result = await apiInstance.post('user/logout')
        return result.data
    } catch (error) {
        throw error
    }
}