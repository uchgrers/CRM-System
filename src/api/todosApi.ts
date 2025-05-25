import axios from "axios"
import {MetaResponse, Todo, TodoInfo, TodosStatus} from "../types/types"

const todosInstance = axios.create({
    baseURL: 'https://easydev.club/api/v1/',
    headers: {
        "Content-Type": "application/json",
    }
})

export const todosApi = {
    getTodos(todosStatus?: TodosStatus) {
        return todosInstance.get<MetaResponse<Todo, TodoInfo>>(`todos?filter=${todosStatus}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    },
    addTodo(title: string) {
        return todosInstance.post<Todo | string>(`todos`, {title})
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    },
    deleteTodo(id: number) {
        return todosInstance.delete<string>(`todos/${id}`)
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    },
    updateTodo(id: number, isDone: boolean, title: string) {
        return todosInstance.put<Todo | string>(`todos/${id}`, {isDone, title})
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    }
}

const baseUrl = 'https://easydev.club/api/v1/'

export const getTodos = async (todosStatus: TodosStatus = TodosStatus.All)
    : Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await fetch(`${baseUrl}todos?filter=${todosStatus}`)
        if (!response.ok) {
            throw new Error('request failed')
        }
        return await response.json()
    } catch (error) {
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
    } catch (error) {
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
        return await response.text()
    } catch (error) {
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