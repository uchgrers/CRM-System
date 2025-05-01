const baseUrl = 'https://easydev.club/api/v1/'

export const getTodos = async (todosStatus = 'all') => {
    try {
        const response = await fetch(`${baseUrl}todos?filter=${todosStatus}`)
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

export const addTodo = async (title: string) => {
    try {
        const response = await fetch(`${baseUrl}todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idDone: false, title})
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo = async (id: number) => {
    try {
        const response = await fetch(`${baseUrl}todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            return id
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async (id: number, isDone: boolean, title: string) => {
    try {
        const response = await fetch(`${baseUrl}todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isDone, title})
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}