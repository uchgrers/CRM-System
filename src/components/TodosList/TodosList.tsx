import React from 'react'
import TodoItem from "../TodoItem/TodoItem"
import s from './TodoList.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage"

type TodosList = Pick<TodosPageType, 'todos' | 'updateTodo' | 'deleteTodo' | 'todosStatus'>

const TodosList: React.FC<TodosList> = (props) => {

    // let todos
    //
    // switch (props.todosStatus) {
    //     case 'all':
    //         todos = props.todos
    //         break
    //     case 'inWork':
    //         todos = props.todos.filter(todo => !todo.isDone)
    //         break
    //     case 'completed':
    //         todos = props.todos.filter(todo => todo.isDone)
    // }

    const todosComponents = props.todos.map(todo => <TodoItem id={todo.id}
                             title={todo.title}
                             isDone={todo.isDone}
                             deleteTodo={props.deleteTodo}
                             updateTodo={props.updateTodo}
                             key={todo.id}
                             todosStatus={props.todosStatus}
    />)

    return (
        <ul className={s.list}>
            {todosComponents}
        </ul>
    );
};

export default TodosList;