import { AuthData, UserRegistration } from "../types/types"
import { apiInstance } from "./apiInstance"

export const signup = async (userData: UserRegistration) => {
    try {
        const result = await apiInstance.post('auth/signup', userData)
        return result.data
    } catch (error: any) {
        console.log(error.response)
        throw error
    }
}

export const signin = async (authData: AuthData) => {
    try {
        const result = await apiInstance.post('auth/signin', authData)
        console.log(result)
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}