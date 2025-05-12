import React, {useState} from 'react'
import s from './TodoItem.module.scss'
import {ButtonColor, ErrorMessageType} from "../../types/types"
import ErrorMessage from "../common/ErrorMessage/ErrorMessage"
import {checkTodoTitle} from "../../functions/inputValidation"
import {deleteTodo, updateTodo} from "../../api/api"
import DeleteIcon from "../ui/DeleteIcon/DeleteIcon"
import Button from "../ui/Button/Button"
import EditIcon from "../ui/EditIcon/EditIcon"

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
        const isIncorrect = checkTodoTitle(e, title)
        if (!isIncorrect) {
            setIsEditing(false)
            await updateTodo(props.id, props.isDone, title)
            props.fetchTodos(props.todosStatus)
            return
        }
        setError(isIncorrect)
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
                <Button content={<EditIcon/>}
                        color={ButtonColor.Primary}
                        onClick={handleStartEditing}
                /> :
                <Button content='Cancel'
                        color={ButtonColor.Secondary}
                        onClick={handleCancelEditing}
                />
            }
            <Button content={<DeleteIcon/>}
                    color={ButtonColor.Dangerous}
                    onClick={handleDeleteTodo}
            />
        </li>
    );
};

export default TodoItem;