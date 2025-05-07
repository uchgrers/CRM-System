import React from 'react'
import TodosList from "../../components/TodosList/TodosList"
import AddTodoForm from "../../components/AddTodoForm/AddTodoForm"
import s from './TodosPage.module.scss'
import {Todo, TodoInfo, TodosStatus} from "../../assets/types"
import TodosSelector from "../../components/TodosSelector/TodosSelector"

export type TodosPageType = {
    todos: Todo[],
    todosStatus: TodosStatus,
    todosCount: TodoInfo
    addTodo: (title: string) => void,
    deleteTodo: (id: number) => void,
    updateTodo: (id: number, isDone: boolean, title: string) => void,
    changeStatus: (todosStatus: TodosStatus) => void
}

const TodosPage: React.FC<TodosPageType> = (props) => {

    return (
        <section className={s.todos}>
            <AddTodoForm addTodo={props.addTodo}/>
            <TodosSelector todos={props.todos}
                           todosCount={props.todosCount}
                           changeStatus={props.changeStatus}
            />
            <TodosList todos={props.todos}
                       todosStatus={props.todosStatus}
                       deleteTodo={props.deleteTodo}
                       updateTodo={props.updateTodo}
            />
        </section>
    );
};

export default TodosPage;