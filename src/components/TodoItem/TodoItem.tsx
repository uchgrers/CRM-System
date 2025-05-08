import React, {useState} from 'react'
import s from './TodoItem.module.scss'
import {ErrorMessageType} from "../../assets/types"
import ErrorMessage from "../common/ErrorMessage/ErrorMessage"
import {handleFormSubmit} from "../../assets/inputValidation"
import {deleteTodo, updateTodo} from "../../api"

const TodoItem = (props) => {

    const [title, setTitle] = useState<string>(props.title)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isDone, setIsDone] = useState<boolean>(props.isDone)
    const [error, setError] = useState<ErrorMessageType>(ErrorMessageType.Correct)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(ErrorMessageType.Correct)
        setTitle(e.target.value)
    }

    const handleTitleEditing = async (e: React.FormEvent<HTMLFormElement> |
        React.MouseEvent<HTMLButtonElement>
    ) => {
        if (!handleFormSubmit(e, title)) {
            setIsEditing(false)
            await updateTodo(props.id, props.isDone, title)
            props.fetchTodos(props.todosStatus)
        }
    }

    const handleCheckboxStatusChange = async () => {
        const relevantIsDone = !isDone
        setIsDone(relevantIsDone)
        await updateTodo(props.id, relevantIsDone, title)
        props.fetchTodos(props.todosStatus)
    }

    const handleStartEditing = () => {
        setIsEditing(true)
    }

    const handleCancelEditing = () => {
        setError(ErrorMessageType.Correct)
        setTitle(props.title)
        setIsEditing(false)
    }

    const handleDeleteTodo = async () => {
        await deleteTodo(props.id)
        props.fetchTodos(props.todosStatus)
    }

    return (
        <li className={s.item}>
            {error && <ErrorMessage message={error}/>}
            <input type="checkbox"
                   checked={props.isDone}
                   onChange={handleCheckboxStatusChange}
            />
            {isEditing ?
                <form onSubmit={handleTitleEditing}>
                    <input type="text"
                           value={title}
                           onChange={handleInputChange}
                           autoFocus={true}
                    />
                    <button type="submit">
                        Save
                    </button>
                </form>
                : <div className={props.isDone ? s.item__done : s.item__title}><p>{props.title}</p></div>
            }

            {!isEditing ?
                <button onClick={handleStartEditing}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -7 36 36" fill="none" stroke="black"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-edit">
                        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                </button> :
                <button onClick={handleCancelEditing}>Cancel</button>
            }

            <button className={s.item__delete_btn} onClick={handleDeleteTodo}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -7 36 36" fill="none" stroke="black"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </li>
    );
};

export default TodoItem;