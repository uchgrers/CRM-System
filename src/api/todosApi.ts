import {MetaResponse, Todo, TodoInfo, TodosStatus} from "../types/types"
import { apiInstance } from "./apiInstance"

export const getTodos = async (todosStatus?: TodosStatus) => {
    try {
        const result = await apiInstance.get<MetaResponse<Todo, TodoInfo>>(`todos?filter=${todosStatus}`)
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const addTodo = async (title: string) => {
    try {
        const result = await apiInstance.post<Todo | string>(`todos`, {title})
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteTodo = async (id: number) => {
    try {
        const result = await apiInstance.delete<string>(`todos/${id}`)
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateTodo = async (id: number, isDone: boolean, title: string) => {
    try {
        const result = await apiInstance.put<Todo | string>(`todos/${id}`, {isDone, title})
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}