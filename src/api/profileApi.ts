import { apiInstance } from "./apiInstance"

export const getProfile = async () => {
    try {
        const result = await apiInstance.get('user/profile')
        return result.data
    } catch (error) {
        throw error
    }
}