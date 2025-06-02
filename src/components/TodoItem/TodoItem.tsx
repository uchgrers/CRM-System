import React, { useState } from "react";
import s from "./TodoItem.module.scss";
import { Todo, TodosStatus } from "../../types/types";
import { ErrorMessageType, TodoMinMaxLength } from "../../constants/todo";
import { Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Checkbox from "antd/es/checkbox";
import { useForm } from "antd/es/form/Form";
import { deleteTodo, updateTodo } from "../../api/todosApi";
import Typography from "antd/es/typography/Typography";
import { List } from "antd";

type TodoItemProps = Omit<Todo, "created"> & {
  key: number;
  todosStatus: TodosStatus;
  fetchTodos: (todosStatus?: TodosStatus) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  key,
  title,
  id,
  isDone,
  todosStatus,
  fetchTodos,
}) => {
  const [form] = useForm();

  const [localTitle, setLocalTitle] = useState<string>(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localIsDone, setLocalIsDone] = useState<boolean>(isDone);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  const handleTitleEditing = async () => {
    setIsEditing(false);
    try {
      await updateTodo(id, isDone, localTitle);
      fetchTodos(todosStatus);
    } catch (error) {
      setLocalTitle(title);
    }
  };

  const handleCheckboxStatusChange = async () => {
    const relevantIsDone = !localIsDone;
    setLocalIsDone(relevantIsDone);
    try {
      await updateTodo(id, relevantIsDone, localTitle);
      fetchTodos(todosStatus);
    } catch (error) {
      setLocalIsDone(isDone);
    }
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    form.setFields([
      {
        name: "editTodoForm",
        value: title,
      },
    ]);
    setLocalTitle(title);
    setIsEditing(false);
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(id);
    fetchTodos(todosStatus);
  };

  return (
    <List.Item className={s.item} style={{ padding: "10px", margin: "20px 0" }}>
      <Checkbox checked={localIsDone} onChange={handleCheckboxStatusChange} />
      {isEditing && (
        <Form
          form={form}
          layout="inline"
          onFinish={handleTitleEditing}
          initialValues={{ editTodoForm: localTitle }}
        >
          <Form.Item
            key={key}
            name="editTodoForm"
            rules={[
              { required: true, message: ErrorMessageType.TooShort },
              { min: TodoMinMaxLength.Min, message: ErrorMessageType.TooShort },
              { max: TodoMinMaxLength.Max, message: ErrorMessageType.TooLong },
            ]}
          >
            <Input
              autoFocus
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </Form.Item>
          <Button htmlType="submit" color="primary" type="primary">
            Save
          </Button>
        </Form>
      )}
      {!isEditing && (
        <Typography
          style={{
            width: "320px",
            textDecoration: localIsDone ? "line-through" : "none",
            opacity: localIsDone ? "var(--opacity)" : 1,
          }}
        >
          {localTitle}
        </Typography>
      )}
      <div style={{ display: "flex", columnGap: "10px" }}>
        {!isEditing ? (
          <Button
            type="primary"
            onClick={handleStartEditing}
            icon={<EditFilled />}
          />
        ) : (
          <Button onClick={handleCancelEditing}>Cancel</Button>
        )}
        <Button danger icon={<DeleteFilled />} onClick={handleDeleteTodo} />
      </div>
    </List.Item>
  );
};

export default TodoItem;
