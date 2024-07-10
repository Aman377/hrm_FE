import { Button, Form, Input } from "antd";

import React from "react";

import { toast } from "react-toastify";

import { useAddAnnouncementMutation, useUpdateAnnouncementMutation } from "../../redux/rtk/features/announcement/announcementApi";

const AddAnnouncement = ({ id, title, description }) => {
  console.log("title: ", id);
  const [addAnnouncement, { isLoading }] = useAddAnnouncementMutation();
  const [updateAnnouncement] = useUpdateAnnouncementMutation();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (id) {
      await updateAnnouncement({ id, values });

    } else {
      const resp = await addAnnouncement(values);

      if (resp.data && !resp.error) {
        form.resetFields();
      }
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
          rules={!id ? [
            {
              required: true,
              message: "Please input your title!",
            },
          ] : null}
        >
          {id ? (
            <Input defaultValue={title} />
          ) : (
            <Input placeholder='Meeting at 00:00' />
          )}
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label='Description'
          name={"description"}
        >
          {description ? <Input.TextArea defaultValue={description} /> :
            <Input.TextArea placeholder='Description' />}
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 6,
            span: 12,
          }}
        >
          {title ? <Button
            className="w-60"
            type='primary'
            size='large'
            block
            htmlType='submit'
            loading={isLoading}
          >
            Update Announcement
          </Button> :
            <Button
              className="w-60"
              type='primary'
              size='large'
              block
              htmlType='submit'
              loading={isLoading}
            >
              Add Announcement
            </Button>
          }
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddAnnouncement;
