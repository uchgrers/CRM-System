import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Todos from "./pages/Todos/Todos"
import Preloader from "./components/common/Preloader/Preloader"
import TodoItemDetails from "./components/TodoItemDetails/TodoItemDetails";

function App() {

    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://easydev.club/api/v1/todos')
                if (response.ok) {
                    const todos = await response.json()
                    setTodos(todos.data)
                }
            } catch (error) {
                throw new Error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTasks()
    }, [])


    const addTodo = async (title) => {
        setIsLoading(true)
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
        setIsLoading(false)
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

    const updateTodo = async (id, isDone, title) => {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isDone, title})
        })
        if (response.ok) {
            const updatedTodo = await response.json()
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
                       element={<Todos todos={todos}
                                       addTodo={addTodo}
                                       deleteTodo={deleteTodo}
                                       updateTodo={updateTodo}
                       />}/>
                <Route path='/todos'
                       element={<Todos todos={todos}
                                       addTodo={addTodo}
                                       deleteTodo={deleteTodo}
                                       updateTodo={updateTodo}
                       />}/>
                <Route path='/todos/:id' element={<TodoItemDetails todos={todos}/>}/>

                <Route path='/*' element={<div>Not found</div>}/>
            </Routes>
        </>
    )
}

export default App
