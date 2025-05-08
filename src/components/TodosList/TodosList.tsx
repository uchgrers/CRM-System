import React from 'react'
import TodoItem from "../TodoItem/TodoItem"
import s from './TodoList.module.scss'
import {Todo, TodosStatus} from "../../assets/types"

type TodosList = {
    todos: Todo[],
    todosStatus: TodosStatus,
    fetchTodos: (todosStatus?: TodosStatus) => void
}

const TodosList: React.FC<TodosList> = (props) => {

    const filteredTodos = props.todosStatus === TodosStatus.All ?
        props.todos : props.todosStatus === TodosStatus.InWork ? props.todos.filter(todo => !todo.isDone) :
            props.todos.filter(todo => todo.isDone)


    const todos = filteredTodos.map(todo => <TodoItem id={todo.id}
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