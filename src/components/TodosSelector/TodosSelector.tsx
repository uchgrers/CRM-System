import React from "react";
import { Tabs } from "antd";
import { TodosStatus, TodoInfo } from "../../types/types";

type TodosSelectorProps = {
  todosCount: TodoInfo;
  fetchTodos: (todosStatus: TodosStatus) => void;
  setTodosStatus: (todosStatus: TodosStatus) => void;
};

const TodosSelector: React.FC<TodosSelectorProps> = ({
  todosCount,
  fetchTodos,
  setTodosStatus,
}) => {
  const handleStatusChange = (status: string) => {
    setTodosStatus(status as TodosStatus);
    fetchTodos(status as TodosStatus);
  };

  const items = [
    {
      key: TodosStatus.All,
      label: `All (${todosCount.all})`,
      children: [],
    },
    {
      key: TodosStatus.InWork,
      label: `In Work (${todosCount.inWork})`,
      children: [],
    },
    {
      key: TodosStatus.Completed,
      label: `Completed (${todosCount.completed})`,
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
