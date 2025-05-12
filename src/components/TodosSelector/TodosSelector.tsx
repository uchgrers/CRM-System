import React from 'react'
import s from './TodosSelector.module.scss'
import {TodoInfo, TodosStatus} from "../../types/types"

type TodosSelector = {
    todosCount: TodoInfo,
    fetchTodos: (todosStatus: TodosStatus) => void,
    setTodosStatus: (todosStatus: TodosStatus) => void
}

const TodosSelector: React.FC<TodosSelector> = (props) => {

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setTodosStatus(e.target.value as TodosStatus)
        props.fetchTodos(e.target.value as TodosStatus)
    }

    return (
        <fieldset className={s.selector}>
            <div className={s.selector__category}>
                <input defaultChecked={true}
                       id="all"
                       type="radio"
                       name="todo_selector"
                       value={TodosStatus.All} onChange={handleStatusChange}
                />
                <label htmlFor="all">All ({props.todosCount?.all})</label>
            </div>
            <div className={s.selector__category}>
                <input id="inWork"
                       type="radio"
                       name="todo_selector"
                       value={TodosStatus.InWork}
                       onChange={handleStatusChange}
                />
                <label htmlFor="inWork">In work ({props.todosCount?.inWork})</label>
            </div>
            <div className={s.selector__category}>
                <input id="completed"
                       type="radio"
                       name="todo_selector"
                       value={TodosStatus.Completed}
                       onChange={handleStatusChange}
                />
                <label htmlFor="completed">Completed ({props.todosCount?.completed})</label>
            </div>
        </fieldset>
    );
};

export default TodosSelector;