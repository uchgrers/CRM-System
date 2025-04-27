import React from 'react'
import TodoItem from "../TodoItem/TodoItem"
import s from './TodoList.module.scss'

const TodosList = (props) => {

    const todos = props.todos.map(todo => <TodoItem id={todo.id}
                                                    title={todo.title}
                                                    deleteTodo={props.deleteTodo}
    />)

    return (
        <ul className={s.list}>
            {todos}
        </ul>
    );
};

export default TodosList;