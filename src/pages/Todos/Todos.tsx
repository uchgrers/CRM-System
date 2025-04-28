import React from 'react'
import TodosList from "../../components/TodosList/TodosList"
import AddTodoForm from "../../components/AddTodoForm/AddTodoForm"
import s from './Todos.module.scss'

const Todos = (props) => {

    return (
        <section className={s.todos}>
            <AddTodoForm addTodo={props.addTodo}/>
            <TodosList todos={props.todos}
                       deleteTodo={props.deleteTodo}
                       updateTodo={props.updateTodo}
            />
        </section>
    );
};

export default Todos;