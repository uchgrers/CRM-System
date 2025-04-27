import React from 'react';
import {useParams} from "react-router-dom";

const TodoItemDetails = (props) => {

    const {id} = useParams()
    const todo = props.todos.find(todo => String(todo.id) === id)

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