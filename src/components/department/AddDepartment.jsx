import { Button, Form, Input, Typography } from "antd";

import React from "react";
import { toast } from "react-toastify";
import { useAddDepartmentMutation } from "../../redux/rtk/features/Department/departmentApi";

const AddDepartment = () => {
  const [addDepartment, { isLoading: addLoading }] = useAddDepartmentMutation();

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const resp = await addDepartment(values);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding department");
  };

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey='department-form'
      name='basic'
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "20px" }}
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 6,
            span: 12,
          }}
        >
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            block
            loading={addLoading}
          >
            Add New department
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddDepartment;
