import React, {useState} from 'react'
import s from './AddTodoForm.module.scss'

const AddTodoForm = (props) => {

    const [title, setTitle] = useState('')


    return (
        <form className={s.form}>
            <input type="text"
                   placeholder="Task To Be Done..."
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
            />
            <button className={s.form__submission_btn}
                    onClick={(e) => {
                        props.addTodo(title)
                        e.preventDefault()
                        setTitle('')
                    }}
            >
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;