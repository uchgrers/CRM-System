import React, {useState} from 'react'
import s from './AddTodoForm.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage";

type AddTodoFormType = Pick<TodosPageType, 'addTodo'>

const AddTodoForm: React.FC<AddTodoFormType> = (props) => {

    const [title, setTitle] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        props.addTodo(title)
        e.preventDefault()
        setTitle('')
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
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