import React, {useState} from 'react'
import s from './AddTodoForm.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"
import ErrorMessage from "../common/ErrorMessage/ErrorMessage"
import {ErrorMessageType} from "../../assets/types"

type AddTodoFormType = Pick<TodosPageType, 'addTodo'>

const AddTodoForm: React.FC<AddTodoFormType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<ErrorMessageType | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 64) {
            setError('Maximum task length is 64 symbols')
            return
        }
        setError(null)
        setTitle(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (title.trim().length < 2) {
            setError('Task must contain at least 2 symbols')
            return
        }
        if (title.trim().length > 64) {
            setError('Maximum task length is 64 symbols')
            return
        }
        props.addTodo(title)
        setTitle('')
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error}/>}
            <input type="text"
                   placeholder="Task To Be Done..."
                   value={title}
                   onChange={handleInputChange}
            />
            <button className={s.form__submission_btn}>
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;