import React from 'react'
import TodosList from "../../components/TodosList/TodosList"
import AddTodoForm from "../../components/AddTodoForm/AddTodoForm"
import s from './TodosPage.module.scss'
import {Todos, TodosCountObjectType, TodosStatus} from "../../assets/types"
import TodosSelector from "../../components/TodosSelector/TodosSelector"

export type TodosPageType = {
    todos: Todos,
    todosStatus: TodosStatus,
    todosCount: TodosCountObjectType,
    addTodo: (title: string) => void,
    deleteTodo: (id: number) => void,
    updateTodo: (id: number, isDone: boolean, title: string, todosStatus) => void,
    getTodos: (todosStatus: TodosStatus) => void,
    setTodosStatus: (todosStatus: TodosStatus) => void,
}

const TodosPage: React.FC<TodosPageType> = (props) => {

    return (
        <section className={s.todos}>
            <AddTodoForm addTodo={props.addTodo}/>
            <TodosSelector getTodos={props.getTodos}
                           setTodosStatus={props.setTodosStatus}
                           todosCount={props.todosCount}
                           todos={props.todos}
            />
            <TodosList todos={props.todos}
                       deleteTodo={props.deleteTodo}
                       updateTodo={props.updateTodo}
                       todosStatus={props.todosStatus}
            />
        </section>
    );
};

export default TodosPage;