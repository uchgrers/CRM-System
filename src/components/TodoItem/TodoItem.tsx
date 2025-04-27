import React from 'react'
import s from './TodoItem.module.scss'
import TodoItemButtons from "../TodoItemButtons/TodoItemButtons";

const TodoItem = (props) => {
    return (
        <li className={s.item}>
            <div className={s.item__content_container}>
                <input className={s.item__checkbox} type="checkbox"/>
                {props.title}
            </div>
            <div className={s.item__content_container}>
                <TodoItemButtons deleteTodo={props.deleteTodo} id={props.id}/>
            </div>
        </li>
    );
};

export default TodoItem;