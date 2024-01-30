import { Button, Form, Input, TimePicker, Typography } from "antd";

import dayjs from "dayjs";
import React from "react";
import { toast } from "react-toastify";
import { useAddShiftMutation } from "../../redux/rtk/features/shift/shiftApi";

const AddShift = ({ drawer }) => {
  const [addShift, { isLoading: addLoading }] = useAddShiftMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const shiftData = {
      name: values.name,
      startTime: dayjs(values.startTime).format(),
      endTime: dayjs(values.endTime).format(),
    };
    try {
      const res = await addShift(shiftData);
      if (!res.error && res.data) {
        form.resetFields();
      }
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding shift");
  };

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey='shift-form'
      name='basic'
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='mx-4'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Please input your shift!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Start Time'
          name='startTime'
          rules={[
            {
              required: true,
              message: "Please input your shift!",
            },
          ]}
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label='End Time'
          name='endTime'
          rules={[
            {
              required: true,
              message: "Please input your shift!",
            },
          ]}
        >
          <TimePicker />
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
            Add New Shift
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddShift;
