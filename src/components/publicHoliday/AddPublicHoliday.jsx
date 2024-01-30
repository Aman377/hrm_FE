import { Button, DatePicker, Form, Input } from "antd";

import dayjs from "dayjs";
import React from "react";
import { toast } from "react-toastify";
import { useAddPublicHolidayMutation } from "../../redux/rtk/features/publicHoliday/publicHolidayApi";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddPublicHoliday = () => {
  const [addPublicHoliday, { isLoading: addLoading }] =
    useAddPublicHolidayMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resp = await addPublicHoliday(values);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding department");
  };
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },

    {
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-publicHoliday"}>
          <ViewBtn path={`/admin/holiday/public/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];
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
              message: "Please input name!",
            },
          ]}
        >
          <Input placeholder='New Year' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label='Date'
          name='date'
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
        >
          <DatePicker placeholder='Select Date' />
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
            Add Public Holiday
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddPublicHoliday;
