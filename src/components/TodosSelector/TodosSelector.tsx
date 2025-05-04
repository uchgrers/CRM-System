import React from 'react'
import s from './TodosSelector.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"
import {TodosStatus} from "../../assets/types"

type TodosSelectorType = Pick<TodosPageType, 'todos' | 'todosCount' | 'changeStatus'>

const TodosSelector: React.FC<TodosSelectorType> = (props) => {

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(e.target.value as TodosStatus)
    }

    return (
        <fieldset className={s.selector}>
            <div className={s.selector__category}>
                <input defaultChecked={true}
                       id="all"
                       type="radio"
                       name="todo_selector"
                       value="all" onChange={handleStatusChange}
                />
                <label htmlFor="all">All ({props.todosCount?.all})</label>
            </div>
            <div className={s.selector__category}>
                <input id="inWork"
                       type="radio"
                       name="todo_selector"
                       value="inWork"
                       onChange={handleStatusChange}
                />
                <label htmlFor="inWork">In work ({props.todosCount?.inWork})</label>
            </div>
            <div className={s.selector__category}>
                <input id="completed"
                       type="radio"
                       name="todo_selector"
                       value="completed"
                       onChange={handleStatusChange}
                />
                <label htmlFor="completed">Completed ({props.todosCount?.completed})</label>
            </div>
        </fieldset>
    );
};

export default TodosSelector;