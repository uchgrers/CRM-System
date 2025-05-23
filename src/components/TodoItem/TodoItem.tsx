import React, { useState } from "react";
import s from "./TodoItem.module.scss";
import { Todo, TodosStatus } from "../../types/types";
import { deleteTodo, updateTodo } from "../../api/api";
import { ErrorMessageType } from "../../constants/todo";
import { Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Checkbox from "antd/es/checkbox";
import { useForm } from "antd/es/form/Form";

type TodoItem = Omit<Todo, "created"> & {
  key: number;
  todosStatus: TodosStatus;
  fetchTodos: (todosStatus?: TodosStatus) => void;
};

const TodoItem: React.FC<TodoItem> = (props) => {
  const [form] = useForm();

  const [title, setTitle] = useState<string>(props.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(props.isDone);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleEditing = async () => {
    setIsEditing(false);
    await updateTodo(props.id, props.isDone, title);
    props.fetchTodos(props.todosStatus);
  };

  const handleCheckboxStatusChange = async () => {
    const relevantIsDone = !isDone;
    setIsDone(relevantIsDone);
    await updateTodo(props.id, relevantIsDone, title);
    props.fetchTodos(props.todosStatus);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    form.setFields([
      {
        name: "editTodoForm",
        value: props.title,
      },
    ]);
    setTitle(props.title);
    setIsEditing(false);
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(props.id);
    props.fetchTodos(props.todosStatus);
  };

  return (
    <li className={s.item}>
      <Checkbox checked={props.isDone} onChange={handleCheckboxStatusChange} />
      {isEditing ? (
        <Form
          form={form}
          layout="inline"
          onFinish={handleTitleEditing}
          initialValues={{ editTodoForm: title }}
        >
          <Form.Item
            name="editTodoForm"
            validateTrigger="onSubmit"
            rules={[
              { required: true, message: ErrorMessageType.TooShort },
              { min: 2, message: ErrorMessageType.TooShort },
              { max: 64, message: ErrorMessageType.TooLong },
            ]}
          >
            <Input
              autoFocus
              onChange={(e) => {
                handleInputChange(e);
                form.setFields([
                  {
                    name: "editTodoForm",
                    errors: undefined,
                  },
                ]);
              }}
            />
          </Form.Item>
          <Button htmlType="submit" color="primary" type="primary">
            Save
          </Button>
        </Form>
      ) : (
        <div className={props.isDone ? s.item__done : s.item__title}>
          <p>{props.title}</p>
        </div>
      )}

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
    </li>
  );
};

export default TodoItem;
