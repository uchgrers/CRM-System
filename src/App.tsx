import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import TodoItemDetails from "./components/TodoItemDetails/TodoItemDetails"
import TodosPage from "./pages/TodosPage/TodosPage"
import {Todos, TodosStatus} from "./assets/types"
import {addTodo, deleteTodo, getTodos, updateTodo} from "./api"

function App() {

    const [todos, setTodos] = useState<Todos>([])

    // Статус просматриваемых туду (все/в работе/завершенные)
    const [todosStatus, setTodosStatus] = useState<TodosStatus>('all')

    const fetchTodos = async (todosStatus) => {
        const fetchedTodos = await getTodos(todosStatus)
        setTodos(fetchedTodos.data)
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

        // Проверка на текущий статус просматриваемых туду
        // и какой тип обновления был сделан (чекбокс или название)
        if (todosStatus !== 'all' && typeOfUpdate === 'check') {
            setTodos(todos.filter(todo => todo.id !== updatedTodo.id))
            return
        }
        setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
    }

    return (
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
    )
}

export default App
