import { Button, Form, Input } from "antd";

import React from "react";
import { toast } from "react-toastify";
import { useAddLeavePolicyMutation } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";

const AddLeavePolicy = ({ drawer }) => {
  const [addSingleLeavePolicy, { isLoading: addLoading }] =
    useAddLeavePolicyMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const FormData = {
      ...values,
      paidLeaveCount: parseInt(values.paidLeaveCount),
      unpaidLeaveCount: parseInt(values.unpaidLeaveCount),
    };

    const resp = await addSingleLeavePolicy(FormData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding department");
  };

  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey='department-form'
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
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Please input your leave-policy name!",
            },
          ]}
        >
          <Input placeholder='Policy 10-12' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Paid Leave '
          name='paidLeaveCount'
          rules={[
            {
              required: true,
              message: "Please input your paid leave!",
            },
          ]}
        >
          <Input placeholder='20' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Unpaid Leave '
          name='unpaidLeaveCount'
          rules={[
            {
              required: true,
              message: "Please input your unpaid Leave !",
            },
          ]}
        >
          <Input placeholder='10' />
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
            Add New Policy
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddLeavePolicy;
