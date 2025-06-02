import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { Todo, TodosStatus } from "../../types/types";
import { List } from "antd";

type TodosList = {
  todos: Todo[];
  todosStatus: TodosStatus;
  fetchTodos: (todosStatus?: TodosStatus) => void;
};

const TodosList: React.FC<TodosList> = ({ todos, todosStatus, fetchTodos }) => {
  return (
    <List
      dataSource={todos}
      renderItem={(item: Todo) => (
        <TodoItem
          key={item.id}
          todosStatus={todosStatus}
          id={item.id}
          title={item.title}
          isDone={item.isDone}
          fetchTodos={fetchTodos}
        />
      )}
    />
  );
};

export default TodosList;
