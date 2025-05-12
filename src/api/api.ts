import {GetTodos, Todo, TodosStatus} from "../types/types"

const baseUrl = 'https://easydev.club/api/v1/'

export const getTodos = async (todosStatus: TodosStatus = TodosStatus.All): Promise<GetTodos | string> => {
    try {
        const response = await fetch(`${baseUrl}todos?filter=${todosStatus}`)
        if (!response.ok) {
            throw new Error('request failed')
        }
        return await response.json()
    } catch (error: string) {
        console.log(error)
        throw new Error(String(error))
    }
}

export const addTodo = async (title: string): Promise<Todo | string> => {
    try {
        const response = await fetch(`${baseUrl}todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isDone: false, title})
        })
        if (!response.ok) {
            throw new Error('request failed')
        }
        return await response.json()
    } catch (error: string) {
        console.log(error)
        throw new Error(String(error))
    }
}

export const deleteTodo = async (id: number): Promise<string> => {
    try {
        const response = await fetch(`${baseUrl}todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error('request failed')
        }
        return await response.json()
    } catch (error: string) {
        console.log(error)
        throw new Error(String(error))
    }
}

export const updateTodo = async (id: number, isDone: boolean, title: string): Promise<Todo | string> => {
    try {
        const response = await fetch(`${baseUrl}todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isDone, title})
        })
        if (!response.ok) {
            throw new Error('request failed')
        }
        return await response.json()
    } catch (error) {
        console.log(error)
        throw new Error(String(error))
    }
}