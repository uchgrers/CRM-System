import React, {useState} from 'react'
import s from './TodoItem.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"
import {ErrorMessageType, Todo} from "../../assets/types"
import ErrorMessage from "../common/ErrorMessage/ErrorMessage"
import {handleFormSubmit, handleInputChange} from "../../assets/inputValidation"

type TodoItemType = Pick<TodosPageType, 'todosStatus' | 'updateTodo' |
    'deleteTodo'> & Pick<Todo, 'title' | 'isDone' | 'id'>

const TodoItem: React.FC<TodoItemType> = (props) => {

    const [title, setTitle] = useState<string>(props.title)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isDone, setIsDone] = useState<boolean>(props.isDone)
    const [error, setError] = useState<ErrorMessageType | null>(null)

    const handleTitleEditing = (e, relevantIsDone) => {
        if (handleFormSubmit(e, title, setError)) {
            setIsEditing(false)
            props.updateTodo(props.id, relevantIsDone, title, props.todosStatus)
        }
    }

    const cancelEditing = () => {
        setError(null)
        setTitle(props.title)
        setIsEditing(false)
    }

    const handleCheckboxStatusChange = () => {
        const relevantIsDone = !isDone
        setIsDone?.(relevantIsDone)
        props.updateTodo(props.id, relevantIsDone, title, props.todosStatus)
    }

    return (
        <li className={s.item}>
            {error && <ErrorMessage message={error}/>}
            <div className={s.item__content_container}>

                <input type="checkbox"
                       checked={props.isDone}
                       onChange={handleCheckboxStatusChange}
                />
                {isEditing ?
                    <input type="text"
                           value={title}
                           onChange={(e) => handleInputChange(e, setError, setTitle)}
                           autoFocus={true}
                    />
                    : <div><p>{props.title}</p></div>
                }
            </div>
            <div className={s.item__content_container}>
                {!isEditing ?
                    <button onClick={() => setIsEditing(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -7 36 36" fill="none" stroke="black"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-edit">
                            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                        </svg>
                    </button> :
                    <button onClick={(e) => handleTitleEditing(e, isDone)}>
                        Save
                    </button>
                }

                {isEditing && <button onClick={cancelEditing}>Cancel</button>}

                <button className={s.item__delete_btn}
                        onClick={() => props.deleteTodo(props.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -7 36 36" fill="none" stroke="black"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-trash-2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        </li>
    );
};

export default TodoItem;