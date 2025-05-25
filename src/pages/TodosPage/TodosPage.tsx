import { useEffect, useState } from "react";
import TodosList from "../../components/TodosList/TodosList";
import { Todo, TodoInfo, TodosStatus } from "../../types/types";
import AddTodoFormAntDesign from "../../components/AddTodoForm/AddTodoForm";
import TodosSelectorAntDesign from "../../components/TodosSelector/TodosSelector";
import { todosApi } from "../../api/todosApi";
import { Flex } from "antd";

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Статус просматриваемых туду (все/в работе/завершенные)
  const [todosStatus, setTodosStatus] = useState<TodosStatus>(TodosStatus.All);
  // Вычисление списков туду по статусу
  const [todosCount, setTodosCount] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  const fetchTodos = async (todosStatus?: TodosStatus) => {
    const result = await todosApi.getTodos(todosStatus);
    setTodos(result.data);
    setTodosCount(result.info);
  };

  useEffect(() => {
    fetchTodos(todosStatus);
    const interval = setInterval(() => {
      fetchTodos(todosStatus);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [todosStatus]);

  return (
    <Flex vertical style={{ margin: "20px 0", alignItems: "center" }}>
      <AddTodoFormAntDesign fetchTodos={fetchTodos} />
      <TodosSelectorAntDesign
        todosCount={todosCount}
        fetchTodos={fetchTodos}
        setTodosStatus={setTodosStatus}
      />
      <TodosList
        todos={todos}
        todosStatus={todosStatus}
        fetchTodos={fetchTodos}
      />
    </Flex>
  );
};

export default TodosPage;
