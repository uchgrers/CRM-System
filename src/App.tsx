import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Preloader from "./components/common/Preloader/Preloader"
import TodoItemDetails from "./components/TodoItemDetails/TodoItemDetails"
import TodosPage from "./pages/TodosPage/TodosPage"
import {Todos, TodosStatus} from "./assets/types"

function App() {

    const [todos, setTodos] = useState<Todos>([])
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [todosStatus, setTodosStatus] = useState<TodosStatus>('all')
    const [todosCount, setTodosCount] = useState<any>()

    const getTodos = async (todosStatus = 'all') => {
        try {
            const response = await fetch(`https://easydev.club/api/v1/todos?filter=${todosStatus}`)
            if (response.ok) {
                const todos = await response.json()
                setTodos(todos.data)
                const inWork = todos.data.filter(todo => !todo.isDone).length
                setTodosCount({
                    all: todos.data.length,
                    inWork,
                    completed: todos.data.length - inWork
                })
            }
        } catch (error) {
            throw new Error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])


    const addTodo = async (title) => {
        // setIsLoading(true)
        const response = await fetch('https://easydev.club/api/v1/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idDone: false, title})
        })
        if (response.ok) {
            const newTodo = await response.json()
            setTodos([...todos, newTodo])
        }

        // setIsLoading(false)
    }

    const deleteTodo = async (id) => {
        setIsLoading(true)
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            setTodos(todos.filter(todo => todo.id !== id))
        }
        setIsLoading(false)
    }

    const updateTodo = async (id, isDone, title, todosStatus) => {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isDone, title})
        })
        if (response.ok) {
            const updatedTodo = await response.json()
            if (todosStatus !== 'all') {
                setTodos(todos.filter(todo => todo.id !== updatedTodo.id))
                return
            }
            setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
        }
    }

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <>
            <Routes>
                <Route path='/'
                       element={<TodosPage todos={todos}
                                           todosStatus={todosStatus}
                                           todosCount={todosCount}
                                           addTodo={addTodo}
                                           deleteTodo={deleteTodo}
                                           updateTodo={updateTodo}
                                           getTodos={getTodos}
                                           setTodosStatus={setTodosStatus}
                       />}/>
                <Route path='/todos'
                       element={<TodosPage todos={todos}
                                           todosStatus={todosStatus}
                                           todosCount={todosCount}
                                           addTodo={addTodo}
                                           deleteTodo={deleteTodo}
                                           updateTodo={updateTodo}
                                           getTodos={getTodos}
                                           setTodosStatus={setTodosStatus}
                       />}/>
                <Route path='/todos/:id' element={<TodoItemDetails todos={todos}/>}/>

                <Route path='/*' element={<div>Not found</div>}/>
            </Routes>
        </>
    )
}

export default App
