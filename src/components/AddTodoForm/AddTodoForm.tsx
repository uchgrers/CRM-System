import React, {useState} from 'react'
import s from './AddTodoForm.module.scss'
import ErrorMessage from "../common/ErrorMessage/ErrorMessage"
import {ErrorMessageType} from "../../assets/types"
import {handleFormSubmit, handleInputChange} from "../../assets/inputValidation"
import {addTodo} from "../../api"

type AddTodoForm = {
    fetchTodos: () => void
}

const AddTodoForm: React.FC<AddTodoForm> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<ErrorMessageType>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (handleFormSubmit(e, title, setError)) {
            await addTodo(title)
            setTitle('')
            props.fetchTodos()
        }
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error}/>}
            <input type="text"
                   placeholder="Task To Be Done..."
                   value={title}
                   onChange={(e) => handleInputChange(e, setError, setTitle)}
            />
            <button type="submit" className={s.form__submission_btn}>
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;