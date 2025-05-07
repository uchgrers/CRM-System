import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import TodosPage from "./pages/TodosPage/TodosPage"
import {Todos, TodosCountObjectType, TodosStatus} from "./assets/types"
import {addTodo, deleteTodo, getTodos, updateTodo} from "./api"

// assets - иконки, картинки и тд
// заменить перечисления на enum
// имена типам давать в соответствии с докумнентацией
// сделать мини ui либу (ui kit)

function App() {

    const [todos, setTodos] = useState<Todos>([])

    // Статус просматриваемых туду (все/в работе/завершенные)
    const [todosStatus, setTodosStatus] = useState<TodosStatus>('all')
    // Вычисление списков туду по статусу
    const [todosCount, setTodosCount] = useState<TodosCountObjectType>({
        all: 0,
        inWork: 0,
        completed: 0
    })

    const handleStatusChange = async (todosStatus: TodosStatus = 'all') => {
        setTodosStatus(todosStatus)
        await getTodos(todosStatus, setTodos, setTodosCount)
    }

    const handleAddTodo = async (title: string) => {
        await addTodo(title)
        await getTodos(todosStatus, setTodos, setTodosCount)
    }

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
        await getTodos(todosStatus, setTodos, setTodosCount)
    }

    const handleUpdateTodo = async (id: number, isDone: boolean, title: string) => {
        await updateTodo(id, isDone, title)
        await getTodos(todosStatus, setTodos, setTodosCount)
    }

    useEffect(() => {
        const fetchTodos = async () => {
            await getTodos(todosStatus, setTodos, setTodosCount)
        }
        fetchTodos()
    }, [])

    return (
        <Routes>
            <Route path='/'
                   element={<TodosPage todos={todos}
                                       todosStatus={todosStatus}
                                       todosCount={todosCount}
                                       addTodo={handleAddTodo}
                                       deleteTodo={handleDeleteTodo}
                                       updateTodo={handleUpdateTodo}
                                       changeStatus={handleStatusChange}

                   />}/>
            <Route path='/todos'
                   element={<TodosPage todos={todos}
                                       todosStatus={todosStatus}
                                       todosCount={todosCount}
                                       addTodo={handleAddTodo}
                                       deleteTodo={handleDeleteTodo}
                                       updateTodo={handleUpdateTodo}
                                       changeStatus={handleStatusChange}
                   />}/>
            <Route path='/*' element={<div>Not found</div>}/>
        </Routes>
    )
}

export default App
