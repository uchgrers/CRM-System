import React from "react";
import { Tabs } from "antd";
import { TodosStatus, TodoInfo } from "../../types/types";

type TodosSelector = {
  todosCount: TodoInfo;
  fetchTodos: (todosStatus: TodosStatus) => void;
  setTodosStatus: (todosStatus: TodosStatus) => void;
};

const TodosSelectorAntDesign: React.FC<TodosSelector> = (props) => {
  const handleStatusChange = (status: string) => {
    props.setTodosStatus(status as TodosStatus);
    props.fetchTodos(status as TodosStatus);
  };

  const items = [
    {
      key: TodosStatus.All,
      label: `All (${props.todosCount.all})`,
      childres: [],
    },
    {
      key: TodosStatus.InWork,
      label: `All (${props.todosCount.inWork})`,
      childres: [],
    },
    {
      key: TodosStatus.Completed,
      label: `All (${props.todosCount.completed})`,
      childres: [],
    },
  ];

  return (
    <Tabs defaultActiveKey={TodosStatus.All} items={items} onChange={handleStatusChange} />
  );
};

export default TodosSelectorAntDesign;
