import { Register } from "../types/types"
import { apiInstance } from "./apiInstance"

export const signup = async (register: Register) => {
    try {
        const result = await apiInstance.post('auth/signup', register)
        console.log(result)
        return result.data
    } catch (error: any) {
        console.log(error.response)
        throw error
    }
}