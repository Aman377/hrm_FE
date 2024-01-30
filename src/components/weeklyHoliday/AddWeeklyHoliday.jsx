import { Button, Form, Input, Select, Typography } from "antd";

import React from "react";
import { toast } from "react-toastify";
import { useAddWeeklyHolidayMutation } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";

const AddWeeklyHoliday = () => {
  const [addSingleWeeklyHoliday, { isLoading: addLoading }] =
    useAddWeeklyHolidayMutation();
  const [form] = Form.useForm();

  const { Title } = Typography;

  const onFinish = async (values) => {
    const resp = await addSingleWeeklyHoliday(values);

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
              message: "Please input name!",
            },
          ]}
        >
          <Input placeholder='Saturday-Friday' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Start Day'
          name='startDay'
          rules={[
            {
              required: true,
              message: "Please input start day!",
            },
          ]}
        >
          <Select placeholder='Select Start Day'>
            <Select.Option value='Saturday'>Saturday</Select.Option>
            <Select.Option value='Sunday'>Sunday</Select.Option>
            <Select.Option value='Monday'>Monday</Select.Option>
            <Select.Option value='Tuesday'>Tuesday</Select.Option>
            <Select.Option value='Wednesday'>Wednesday</Select.Option>
            <Select.Option value='Thursday'>Thursday</Select.Option>
            <Select.Option value='Friday'>Friday</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='End Day'
          name='endDay'
          rules={[
            {
              required: true,
              message: "Please input End day!",
            },
          ]}
        >
          <Select placeholder='Select Start Day'>
            <Select.Option value='Saturday'>Saturday</Select.Option>
            <Select.Option value='Sunday'>Sunday</Select.Option>
            <Select.Option value='Monday'>Monday</Select.Option>
            <Select.Option value='Tuesday'>Tuesday</Select.Option>
            <Select.Option value='Wednesday'>Wednesday</Select.Option>
            <Select.Option value='Thursday'>Thursday</Select.Option>
            <Select.Option value='Friday'>Friday</Select.Option>
          </Select>
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
            Add Weekly Holiday
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddWeeklyHoliday;
