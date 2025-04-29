import React from 'react'
import s from "../TodoItem/TodoItem.module.scss"
import Preloader from "../common/Preloader/Preloader"
import {TodoItemTitleAndButtonsPropsType} from "../TodoItem/TodoItem"
import {Todo} from "../../assets/types";

type TodoItemTitleType = Pick<Todo, 'title' | 'isDone'> & TodoItemTitleAndButtonsPropsType

const TodoItemTitle: React.FC<TodoItemTitleType> = (props) => {

    const handleCheckboxStatusChange = () => {
        const relevantIsDone = !props.isDone
        props.setIsDone(relevantIsDone)
        props.updateTodo(relevantIsDone)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.target.value)
    }

    return (
        <>
            { !props.isLoading ?
                <div className={s.item__content_container}>
                    <input className={s.item__checkbox}
                           type="checkbox"
                           checked={props.isDone}
                           onChange={handleCheckboxStatusChange}
                    />
                    {props.isEditing ?
                        <input type="text"
                               value={props.title}
                               onChange={handleInputChange}
                               autoFocus={true}
                        />
                        : <p>{props.title}</p>
                    }
                </div> : <Preloader/>
            }
        </>
    );
};

export default TodoItemTitle;