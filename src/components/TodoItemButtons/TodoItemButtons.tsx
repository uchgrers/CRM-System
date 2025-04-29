import React from 'react'
import s from './TodoItemButtons.module.scss'
import {TodosPageType} from "../../pages/TodosPage/TodosPage";
import {TodoItemTitleAndButtonsPropsType} from "../TodoItem/TodoItem";
import {Todo} from "../../assets/types";

type TodoItemButtonsType = Pick<Todo, 'id' | 'isDone'> &
    Pick<TodosPageType, 'deleteTodo'> & TodoItemTitleAndButtonsPropsType

const TodoItemButtons: React.FC<TodoItemButtonsType> = (props) => {

    const handleSetIsEditing = () => {
        props.setIsEditing(true)
    }

    const handleUpdateTodo = () => {
        props.updateTodo(props.isDone)
    }

    const handleDeleteTodo = () => {
        props.deleteTodo(props.id)
    }

    return (
        <>
            { !props.isEditing?
                <button onClick={handleSetIsEditing}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -7 36 36" fill="none" stroke="black"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-edit">
                        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                </button> :
                <button onClick={handleUpdateTodo}>
                    Save
                </button>
            }

            {props.isEditing && <button onClick={props.cancelEditing}>Cancel</button>}

            <button className={s.delete_btn}
                    onClick={handleDeleteTodo}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -7 36 36" fill="none" stroke="black"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </>
    );
};

export default TodoItemButtons;