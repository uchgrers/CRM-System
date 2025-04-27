import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Todos from "./pages/Todos/Todos"
import Preloader from "./components/common/Preloader/Preloader"
import TodoItemDetails from "./components/TodoItemDetails/TodoItemDetails";

const tasks = [
    {id: 0, title: 'afwef'},
    {id: 1, title: 'wrbb'},
    {id: 2, title: 'qefrbgt'},
    {id: 3, title: 'we,kfopwfp'},
]

function App() {

    const [todos, setTodos] = useState(tasks)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://easydev.club/api/v1/todos')
                if (response.ok) {
                    const todos = await response.json()
                    setTodos(todos.data)
                    setIsLoading(false)
                }
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchTasks()
    }, [])


    const addTodo = async (todo) => {
        setIsLoading(true)
        const response = await fetch('https://easydev.club/api/v1/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idDone: false, title: todo})
        })
        if (response.ok) {
            const newTodo = await response.json()
            setTodos([...todos, newTodo])
            setIsLoading(false)
        }
    }

    const deleteTodo = async (id) => {
        setIsLoading(true)
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })
        if (response.ok) {
            setTodos(todos.filter(todo => todo.id !== id))
            setIsLoading(false)
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
                       />}/>
                <Route path='/todos'
                       element={<Todos todos={todos}
                                       addTodo={addTodo}
                                       deleteTodo={deleteTodo}
                       />}/>
                <Route path='/todos/:id' element={<TodoItemDetails todos={todos}/>}/>

                <Route path='/*' element={<div>Page not found</div>}/>
            </Routes>
        </>
    )
}

export default App
