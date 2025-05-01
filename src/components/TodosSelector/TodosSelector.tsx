import React, {useEffect, useState} from 'react'
import s from './TodosSelector.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"
import {TodosCountObjectType, TodosStatus} from "../../assets/types"
import {getTodos} from "../../api"

type TodosSelectorType = Pick<TodosPageType, 'getTodos' | 'setTodosStatus' | 'todos'>



const TodosSelector: React.FC<TodosSelectorType> = (props) => {

    const [todosCount, setTodosCount] = useState<TodosCountObjectType>({
        all: 0,
        inWork: 0,
        completed: 0
    })

    const handleSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setTodosStatus(e.target.value as TodosStatus)
        props.getTodos(e.target.value as TodosStatus)
    }

    useEffect(() => {
        const fetchedCount = {
            all: 0,
            inWork: 0,
            completed: 0
        }
        getTodos()
            .then(res => {
                fetchedCount.all = res.data.length
                fetchedCount.inWork = res.data.filter(todo => !todo.isDone).length
                fetchedCount.completed = res.data.filter(todo => todo.isDone).length
                setTodosCount(fetchedCount)
            })
    },[props.todos])

    return (
        <fieldset className={s.selector}>
            <div>
                <input defaultChecked={true} id="all" type="radio" name="todo_selector" value='all' onChange={handleSelectorChange}/>
                <label htmlFor="all">All {todosCount?.all}</label>
            </div>
            <div>
                <input id="inWork" type="radio" name="todo_selector" value='inWork' onChange={handleSelectorChange}/>
                <label htmlFor="inWork">In work {todosCount?.inWork}</label>
            </div>
            <div>
                <input id="completed" type="radio" name="todo_selector" value='completed' onChange={handleSelectorChange}/>
                <label htmlFor="completed">Completed {todosCount?.completed}</label>
            </div>
        </fieldset>
    );
};

export default TodosSelector;