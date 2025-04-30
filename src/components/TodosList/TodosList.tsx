import React from 'react'
import TodoItem from "../TodoItem/TodoItem"
import s from './TodoList.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"

type TodosList = Pick<TodosPageType, 'todos' | 'updateTodo' | 'deleteTodo' | 'todosStatus'>

const TodosList: React.FC<TodosList> = (props) => {

    const todos = props.todos.map(todo => <TodoItem id={todo.id}
                             title={todo.title}
                             isDone={todo.isDone}
                             deleteTodo={props.deleteTodo}
                             updateTodo={props.updateTodo}
                             key={todo.id}
                             todosStatus={props.todosStatus}
    />)

    return (
        <ul className={s.list}>
            {todos}
        </ul>
    );
};

export default TodosList;