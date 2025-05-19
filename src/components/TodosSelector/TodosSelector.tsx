import React from 'react'
import s from './TodosSelector.module.scss'
import {TodoInfo, TodosStatus} from "../../types/types"

type TodosSelector = {
    todosCount: TodoInfo,
    todosStatus: TodosStatus,
    fetchTodos: (todosStatus: TodosStatus) => void,
    setTodosStatus: (todosStatus: TodosStatus) => void
}

const TodosSelector: React.FC<TodosSelector> = (props) => {

    const handleStatusChange = (status: TodosStatus) => {
        props.setTodosStatus(status)
        props.fetchTodos(status)
    }

    const getStatusClass = (status: TodosStatus) => {
        return `${s.selector__category} ${props.todosStatus === status ? s.selector__current : ''}`
    }

    return (
        <nav className={s.selector}>
            <div className={getStatusClass(TodosStatus.All)}
                 onClick={() => handleStatusChange(TodosStatus.All)}
            >
                All ({props.todosCount?.all})
            </div>
            <div className={getStatusClass(TodosStatus.InWork)}
                 onClick={() => handleStatusChange(TodosStatus.InWork)}
            >
                In Work ({props.todosCount?.inWork})
            </div>
            <div className={getStatusClass(TodosStatus.Completed)}
                 onClick={() => handleStatusChange(TodosStatus.Completed)}
            >
                Completed ({props.todosCount?.completed})
            </div>
        </nav>
    );
};

export default TodosSelector;