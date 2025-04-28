import React from 'react'
import TodoItem from "../TodoItem/TodoItem"
import s from './TodoList.module.scss'

const TodosList = (props) => {

    const todos = props.todos.map(todo => <TodoItem id={todo.id}
                                                    title={todo.title}
                                                    isDone={todo.isDone}
                                                    deleteTodo={props.deleteTodo}
                                                    updateTodo={props.updateTodo}
                                                    key={todo.id}
    />)

    return (
        <ul className={s.list}>
            {todos}
        </ul>
    );
};

export default TodosList;