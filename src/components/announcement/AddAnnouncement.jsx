import { Button, Form, Input } from "antd";

import React from "react";

import { toast } from "react-toastify";

import { useAddAnnouncementMutation } from "../../redux/rtk/features/announcement/announcementApi";

const AddAnnouncement = () => {
  const [addAnnouncement, { isLoading }] = useAddAnnouncementMutation();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resp = await addAnnouncement(values);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
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
      className='mx-4'
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Title'
          name='title'
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input placeholder='Meeting at 00:00' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label='Description'
          name={"description"}
        >
          <Input.TextArea placeholder='Description' />
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
            block
            htmlType='submit'
            loading={isLoading}
          >
            Add Announcement
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddAnnouncement;
