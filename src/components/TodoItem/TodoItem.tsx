import React, {useState} from 'react'
import s from './TodoItem.module.scss'
import TodoItemButtons from "../TodoItemButtons/TodoItemButtons"
import TodoItemTitle from "../TodoItemTitle/TodoItemTitle"

const TodoItem = (props) => {

    const [title, setTitle] = useState(props.title || '')
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDone, setIsDone] = useState(props.isDone || false)

    const changeTodoParams = async (relevantIsDone) => {
        setIsEditing(false)
        setIsLoading(true)
        await props.updateTodo(props.id, relevantIsDone, title)
        setIsLoading(false)
    }

    const cancelEditing = () => {
        setTitle(props.title)
        setIsEditing(false)
    }

    return (
        <li className={s.item}>
            <TodoItemTitle title={title}
                           isDone={isDone}
                           isLoading={isLoading}
                           isEditing={isEditing}
                           setIsDone={setIsDone}
                           setTitle={setTitle}
                           updateTodo={changeTodoParams}
            />
            <div className={s.item__content_container}>
                <TodoItemButtons id={props.id}
                                 isEditing={isEditing}
                                 isDone={isDone}
                                 setIsEditing={setIsEditing}
                                 setTitle={setTitle}
                                 deleteTodo={props.deleteTodo}
                                 updateTodo={changeTodoParams}
                                 cancelEditing={cancelEditing}
                />
            </div>
        </li>
    );
};

export default TodoItem;