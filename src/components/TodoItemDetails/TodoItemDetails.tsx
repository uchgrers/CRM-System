import React from 'react'
import {useParams} from "react-router-dom"
import {Todos} from '../../assets/types'

type TodoItemDetailsType = {
    todos: Todos
}

const TodoItemDetails: React.FC<TodoItemDetailsType> = (props) => {

    const {id} = useParams()
    let todo = props.todos.find(todo => String(todo.id) === id)

    if (!todo) {
        return <div>Page not found</div>
    }

    return (
        <div>
            <p>id: {todo.id}</p>
            <p>title: {todo.title}</p>
        </div>
    );
};

export default TodoItemDetails;