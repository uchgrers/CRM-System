import React from 'react'
import s from './TodosSelector.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"
import {TodosStatus} from "../../assets/types"

type TodosSelectorType = Pick<TodosPageType, 'setTodosStatus' | 'todos' | 'todosCount'>

const TodosSelector: React.FC<TodosSelectorType> = (props) => {

    const handleSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setTodosStatus(e.target.value as TodosStatus)
    }

    return (
        <fieldset className={s.selector}>
            <div className={s.selector__category}>
                <input defaultChecked={true}
                       id="all"
                       type="radio"
                       name="todo_selector"
                       value="all" onChange={handleSelectorChange}
                />
                <label htmlFor="all">All ({props.todosCount?.all})</label>
            </div>
            <div className={s.selector__category}>
                <input id="inWork"
                       type="radio"
                       name="todo_selector"
                       value="inWork"
                       onChange={handleSelectorChange}
                />
                <label htmlFor="inWork">In work ({props.todosCount?.inWork})</label>
            </div>
            <div className={s.selector__category}>
                <input id="completed"
                       type="radio"
                       name="todo_selector"
                       value="completed"
                       onChange={handleSelectorChange}
                />
                <label htmlFor="completed">Completed ({props.todosCount?.completed})</label>
            </div>
        </fieldset>
    );
};

export default TodosSelector;