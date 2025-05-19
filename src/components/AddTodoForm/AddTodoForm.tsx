import React, {useState} from 'react'
import s from './AddTodoForm.module.scss'
import ErrorMessage from "../common/ErrorMessage/ErrorMessage"
import {checkTodoTitle} from "../../functions/inputValidation"
import {addTodo} from "../../api/api"
import {ErrorMessageType} from "../../constants/todo"
import Button from "../ui/Button/Button";

type AddTodoFormProps = {
    fetchTodos: () => void
}

const AddTodoForm: React.FC<AddTodoFormProps> = (props) => {

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
            <Button type="submit"
                    content={'Add'}
                    color={'button-primary'}
            ></Button>
        </form>
    );
};

export default AddTodoForm;