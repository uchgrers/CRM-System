import React from "react";
import Form from "antd/es/form";
import Button from "antd/es/button";
import Input from "antd/es/input";
import { ErrorMessageType } from "../../constants/todo";
import { addTodo } from "../../api/api";

type AddTodoFormAntDesignProps = {
  fetchTodos: () => void;
};

const AddTodoFormAntDesign: React.FC<AddTodoFormAntDesignProps> = (props) => {

  const [form] = Form.useForm();

  const onSubmit = async (formValues: any) => {
    await addTodo(formValues.addTodoForm);
    form.resetFields();
    props.fetchTodos();
  };

  return (
    <Form
      form={form}
      layout="inline"
      style={{ width: "var(--content-width)" }}
      onFinish={onSubmit}
    >
      <Form.Item
        name={"addTodoForm"}
        style={{ width: "70%" }}
        validateTrigger="onSubmit"
        rules={[
          { required: true, message: ErrorMessageType.TooShort },
          { min: 2, message: ErrorMessageType.TooShort },
          { max: 64, message: ErrorMessageType.TooLong },
        ]}
      >
        <Input
          placeholder={"Task to be done..."}
          onChange={() => {
            form.setFields([
              {
                name: "addTodoForm",
                errors: undefined,
              },
            ]);
          }}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: "120px" }}>
        Add todo
      </Button>
    </Form>
  );
};

export default AddTodoFormAntDesign;
