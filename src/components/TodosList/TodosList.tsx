import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import s from "./TodoList.module.scss";
import { Todo, TodosStatus } from "../../types/types";
import { List } from "antd";

type TodosList = {
  todos: Todo[];
  todosStatus: TodosStatus;
  fetchTodos: (todosStatus?: TodosStatus) => void;
};

const TodosList: React.FC<TodosList> = (props) => {
  return (
    <List
      dataSource={props.todos}
      renderItem={(item: Todo) => (
        <TodoItem
          key={item.id}
          todosStatus={props.todosStatus}
          id={item.id}
          title={item.title}
          isDone={item.isDone}
          fetchTodos={props.fetchTodos}
        />
      )}
    />
  );
};

export default TodosList;
