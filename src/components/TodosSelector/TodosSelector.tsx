import React, {useEffect, useState} from 'react'
import s from './TodosSelector.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"
import {TodosStatus} from "../../assets/types"

type TodosSelectorType = Pick<TodosPageType, 'getTodos' | 'setTodosStatus' | 'todosCount' | 'todos'>

const TodosSelector: React.FC<TodosSelectorType> = (props) => {

    const [todosCount, setTodosCount] = useState<any>()

    const handleSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setTodosStatus(e.target.value as TodosStatus)
        props.getTodos(e.target.value as TodosStatus)
    }

    useEffect(() => {
        const fetchTodos = async (todosStatus = 'all') => {
            try {
                const response = await fetch(`https://easydev.club/api/v1/todos?filter=${todosStatus}`)
                if (!response.ok) {
                    throw new Error('Request failed')
                }
                const todos = await response.json()
                const inWork = todos.data.filter(todo => !todo.isDone).length
                setTodosCount({
                    all: todos.data.length,
                    inWork,
                    completed: todos.data.length - inWork
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchTodos()
    },[props.todos])

    return (
        <fieldset className={s.selector}>
            <div>
                <input defaultChecked={true} id="all" type="radio" name="todo_selector" value='all' onChange={handleSelectorChange}/>
                <label htmlFor="all">All {todosCount?.all || 0}</label>
            </div>
            <div>
                <input id="inWork" type="radio" name="todo_selector" value='inWork' onChange={handleSelectorChange}/>
                <label htmlFor="inWork">In work {todosCount?.inWork || 0}</label>
            </div>
            <div>
                <input id="completed" type="radio" name="todo_selector" value='completed' onChange={handleSelectorChange}/>
                <label htmlFor="completed">Completed {todosCount?.completed || 0}</label>
            </div>
        </fieldset>
    );
};

export default TodosSelector;