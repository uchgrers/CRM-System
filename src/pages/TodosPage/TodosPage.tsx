import React from 'react'
import TodosList from "../../components/TodosList/TodosList"
import AddTodoForm from "../../components/AddTodoForm/AddTodoForm"
import s from './TodosPage.module.scss'
import {Todos} from "../../assets/types";

export type TodosPageType = {
    todos: Todos,
    addTodo: (title: string) => void,
    deleteTodo: (id: number) => void,
    updateTodo: (id: number, isDone: boolean, title: string) => void
}

const TodosPage: React.FC<TodosPageType> = (props) => {

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

export default TodosPage;