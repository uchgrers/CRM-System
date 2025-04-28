import React from 'react';
import s from "../TodoItem/TodoItem.module.scss";
import Preloader from "../common/Preloader/Preloader";

const TodoItemTitle = (props) => {
    return (
        <>
            { !props.isLoading ?
                <div className={s.item__content_container}>
                    <input className={s.item__checkbox}
                           type="checkbox"
                           checked={props.isDone}
                           onChange={() => {
                               const changedIsDone = !props.isDone
                               props.setIsDone(changedIsDone)
                               props.updateTodo(changedIsDone)
                           }}
                    />
                    {props.isEditing ?
                        <input type="text"
                               value={props.title}
                               onChange={(e) => props.setTitle(e.target.value)}
                               autoFocus={true}
                        />
                        : <p>{props.title}</p>
                    }

                </div> : <Preloader/>
            }
        </>
    );
};

export default TodoItemTitle;