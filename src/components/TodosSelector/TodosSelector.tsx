import React from "react";
import { Tabs } from "antd";
import { TodosStatus, TodoInfo } from "../../types/types";

type TodosSelectorProps = {
  todosCount: TodoInfo;
  fetchTodos: (todosStatus: TodosStatus) => void;
  setTodosStatus: (todosStatus: TodosStatus) => void;
};

const TodosSelector: React.FC<TodosSelectorProps> = (props) => {
  const handleStatusChange = (status: string) => {
    props.setTodosStatus(status as TodosStatus);
    props.fetchTodos(status as TodosStatus);
  };

  const items = [
    {
      key: TodosStatus.All,
      label: `All (${props.todosCount.all})`,
      children: [],
    },
    {
      key: TodosStatus.InWork,
      label: `In Work (${props.todosCount.inWork})`,
      children: [],
    },
    {
      key: TodosStatus.Completed,
      label: `Completed (${props.todosCount.completed})`,
      children: [],
    },
  ];

  return (
    <Tabs
      defaultActiveKey={TodosStatus.All}
      items={items}
      onChange={handleStatusChange}
    />
  );
};

export default TodosSelector;
