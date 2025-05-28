import {MetaResponse, Todo, TodoInfo, TodosStatus} from "../types/types"
import { apiInstance } from "./apiInstance"

export const todosApi = {
    getTodos(todosStatus?: TodosStatus) {
        return apiInstance.get<MetaResponse<Todo, TodoInfo>>(`todos?filter=${todosStatus}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    },
    addTodo(title: string) {
        return apiInstance.post<Todo | string>(`todos`, {title})
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    },
    deleteTodo(id: number) {
        return apiInstance.delete<string>(`todos/${id}`)
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    },
    updateTodo(id: number, isDone: boolean, title: string) {
        return apiInstance.put<Todo | string>(`todos/${id}`, {isDone, title})
            .then(response => response)
            .catch(error => {
                console.log(error)
                throw new Error(String(error))
            })
    }
}
