import React, {useState} from 'react'
import s from './AddTodoForm.module.scss'
import ErrorMessage from "../common/ErrorMessage/ErrorMessage"
import {ErrorMessageType} from "../../assets/types"
import {checkTodoTitle} from "../../assets/inputValidation"
import {addTodo} from "../../api"

type AddTodoForm = {
    fetchTodos: () => void
}

const AddTodoForm: React.FC<AddTodoForm> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<ErrorMessageType>(ErrorMessageType.Correct)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(ErrorMessageType.Correct)
        setTitle(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const isIncorrect = checkTodoTitle(e, title)
        if (!isIncorrect) {
            await addTodo(title)
            setTitle('')
            props.fetchTodos()
        }
        setError(isIncorrect)
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error}/>}
            <input type="text"
                   placeholder="Task To Be Done..."
                   value={title}
                   onChange={handleInputChange}
            />
            <button type="submit" className={s.form__submission_btn}>
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;