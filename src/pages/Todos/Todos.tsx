import React from 'react'
import TodosList from "../../components/TodosList/TodosList"
import AddTodoForm from "../../components/AddTodoForm/AddTodoForm"
import s from './Todos.module.scss'

type TodosPage = {
    todos: Todos,
    addTodo: (title: string) => void,
    deleteTodo: (id: number) => void,
    updateTodo: (id: number, isDone: boolean, title: string) => void
}

const Todos: React.FC<TodosPage> = (props) => {

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