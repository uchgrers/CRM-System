import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import TodoItemDetails from "./components/TodoItemDetails/TodoItemDetails"
import TodosPage from "./pages/TodosPage/TodosPage"
import {Todo, Todos, TodosCountObjectType, TodosStatus} from "./assets/types"
import {addTodo, deleteTodo, getTodos, updateTodo} from "./api"

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

    useEffect(() => {
        setTodosCount({
            all: todos.length,
            inWork: todos.filter((todo: Todo) => !todo.isDone).length,
            completed: todos.filter((todo: Todo) => todo.isDone).length
        })
    }, [todos])

    useEffect(() => {
        getTodos()
            .then(res => {
                setTodos(res.data)
                setTodosCount(res.info)
            })
    }, [])

    const handleAddTodo = async (title: string) => {
        const newTodo = await addTodo(title)
        setTodos([...todos, newTodo])
    }

    const handleDeleteTodo = async (id: number) => {
        const deletedTodoId = await deleteTodo(id)
        setTodos(todos.filter(todo => todo.id !== deletedTodoId))
    }

    const handleUpdateTodo = async (id: number, isDone: boolean, title: string) => {
        const updatedTodo = await updateTodo(id, isDone, title)
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
                                       setTodosStatus={setTodosStatus}

                                       todosCount={todosCount}

                   />}/>
            <Route path='/todos'
                   element={<TodosPage todos={todos}
                                       todosStatus={todosStatus}
                                       addTodo={handleAddTodo}
                                       deleteTodo={handleDeleteTodo}
                                       updateTodo={handleUpdateTodo}
                                       setTodosStatus={setTodosStatus}

                                       todosCount={todosCount}
                   />}/>
            <Route path='/todos/:id' element={<TodoItemDetails todos={todos}/>}/>

            <Route path='/*' element={<div>Not found</div>}/>
        </Routes>
    )
}

export default App
