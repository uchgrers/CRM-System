import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import TodoItemDetails from "./components/TodoItemDetails/TodoItemDetails"
import TodosPage from "./pages/TodosPage/TodosPage"
import {Todos, TodosStatus} from "./assets/types"
import {addTodo, deleteTodo, getTodos, updateTodo} from "./api"

function App() {

    const [todos, setTodos] = useState<Todos>([])
    const [todosStatus, setTodosStatus] = useState<TodosStatus>('all')
    // const [todosCount, setTodosCount] = useState<any>({all: 0, inWork: 0, completed: 0})

    const fetchTodos = async (todosStatus) => {
        const fetchedTodos = await getTodos(todosStatus)
        setTodos(fetchedTodos.data)
        // const inWork = fetchedTodos.data.filter(todo => !todo.isDone).length
        // setTodosCount({
        //     all: fetchedTodos.data.length,
        //     inWork,
        //     completed: fetchedTodos.data.length - inWork
        // })
    }

    useEffect(() => {
        fetchTodos('all')
    }, [])

    const handleAddTodo = async (title) => {
        const newTodo = await addTodo(title)
        setTodos([...todos, newTodo])
    }

    const handleDeleteTodo = async (id) => {
        const deletedTodoId = await deleteTodo(id)
        setTodos(todos.filter(todo => todo.id !== deletedTodoId))
    }

    const handleUpdateTodo = async (id, isDone, title, todosStatus, typeOfUpdate) => {
        const updatedTodo = await updateTodo(id, isDone, title, todosStatus)
        if (todosStatus !== 'all' && typeOfUpdate === 'check') {
            setTodos(todos.filter(todo => todo.id !== updatedTodo.id))
            return
        }
        setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
    }

    return (
        <>
            <Routes>
                <Route path='/'
                       element={<TodosPage todos={todos}
                                           todosStatus={todosStatus}
                                           addTodo={handleAddTodo}
                                           deleteTodo={handleDeleteTodo}
                                           updateTodo={handleUpdateTodo}
                                           getTodos={fetchTodos}
                                           setTodosStatus={setTodosStatus}

                       />}/>
                <Route path='/todos'
                       element={<TodosPage todos={todos}
                                           todosStatus={todosStatus}
                                           addTodo={handleAddTodo}
                                           deleteTodo={handleDeleteTodo}
                                           updateTodo={handleUpdateTodo}
                                           getTodos={fetchTodos}
                                           setTodosStatus={setTodosStatus}
                       />}/>
                <Route path='/todos/:id' element={<TodoItemDetails todos={todos}/>}/>

                <Route path='/*' element={<div>Not found</div>}/>
            </Routes>
        </>
    )
}

export default App
