import { Button, Form, Input } from "antd";

import React from "react";

import { toast } from "react-toastify";

import { useAddTaskPriorityMutation } from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriorityApi";

const AddTaskPriority = () => {
  const [form] = Form.useForm();
  const [addSingleTaskPriority, { isLoading }] = useAddTaskPriorityMutation();
  const onFinish = async (values) => {
    const taskPriorityData = {
      ...values,
    };

    const resp = await addSingleTaskPriority(taskPriorityData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding TaskPriority");
  };
  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey='shift-form'
      name='basic'
      layout='vertical'
      className='mx-4'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label='TaskPriority Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Enter TaskPriority Name",
            },
          ]}
        >
          <Input placeholder='Enter TaskPriority Name' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 8,
            span: 12,
          }}
        >
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            block
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddTaskPriority;
