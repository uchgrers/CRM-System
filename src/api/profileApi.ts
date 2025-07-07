import { apiInstance } from "./apiInstance"

export const getProfile = async () => {
    try {
        const result = await apiInstance.get('user/profile')
        console.log(result)
        return result.data
    } catch (error) {
        throw error
    }
}