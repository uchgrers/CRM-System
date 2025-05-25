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
