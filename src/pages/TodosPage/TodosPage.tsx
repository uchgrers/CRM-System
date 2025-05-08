import React, {useEffect, useState} from 'react'
import TodosList from "../../components/TodosList/TodosList"
import AddTodoForm from "../../components/AddTodoForm/AddTodoForm"
import s from './TodosPage.module.scss'
import {Todo, TodoInfo, TodosStatus} from "../../assets/types"
import TodosSelector from "../../components/TodosSelector/TodosSelector"
import {getTodos} from "../../api"

const TodosPage = (props) => {

    const [todos, setTodos] = useState<Todo[]>([])

    // Статус просматриваемых туду (все/в работе/завершенные)
    const [todosStatus, setTodosStatus] = useState<TodosStatus>(TodosStatus.All)
    // Вычисление списков туду по статусу
    const [todosCount, setTodosCount] = useState<TodoInfo>({
        all: 0,
        inWork: 0,
        completed: 0
    })

    const fetchTodos = async (todosStatus?: TodosStatus) => {
        const result = await getTodos(todosStatus)
        setTodos(result.data)
        setTodosCount(result.info)
    }

    useEffect(() => {
        fetchTodos()
    }, [])


    return (
        <section className={s.todos}>
            <AddTodoForm fetchTodos={fetchTodos}/>
            <TodosSelector todosCount={todosCount}
                           fetchTodos={fetchTodos}
                           setTodosStatus={setTodosStatus}
            />
            <TodosList todos={todos}
                       todosStatus={todosStatus}
                       deleteTodo={props.deleteTodo}

                       fetchTodos={fetchTodos}
            />
        </section>
    );
};

export default TodosPage;