import React from 'react'
import TodoItem from "../TodoItem/TodoItem"
import s from './TodoList.module.scss'
import {Todo, TodosStatus} from "../../types/types"

type TodosList = {
    todos: Todo[],
    todosStatus: TodosStatus,
    fetchTodos: (todosStatus?: TodosStatus) => void
}

const TodosList: React.FC<TodosList> = (props) => {

    const todos = props.todos.map(todo => <TodoItem id={todo.id}
                                                      title={todo.title}
                                                      isDone={todo.isDone}
                                                      key={todo.id}
                                                      todosStatus={props.todosStatus}
                                                      fetchTodos={props.fetchTodos}
    />)

    return (
        <ul className={s.list}>
            {todos}
        </ul>
    );
};

export default TodosList;