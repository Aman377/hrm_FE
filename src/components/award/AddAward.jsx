import { Button, Form, Input } from "antd";

import React from "react";
import { toast } from "react-toastify";
import { useAddAwardMutation } from "../../redux/rtk/features/award/awardApi";

const AddAward = () => {
  const [form] = Form.useForm();
  const [addSingleAward, { isLoading }] = useAddAwardMutation();

  const onFinish = async (values) => {
    const resp = await addSingleAward(values);

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
      className='mx-4'
      layout='vertical'
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
              message: "Please input your award name!",
            },
          ]}
        >
          <Input placeholder='Employee Of The Month' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label='Description'
          name='description'
          rules={[
            {
              required: true,
              message: "Please input your award description!",
            },
          ]}
        >
          <Input placeholder='About the award' />
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
            loading={isLoading}
          >
            Add New Award
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddAward;
