import { Form, Input, InputNumber } from "antd";
import { Button } from "antd/lib";
import { useState } from "react";
import { useUpdateConfigEmailMutation } from "../../redux/rtk/features/emailConfig/emailConfigApi";

export default function UpdateEmailConfig({ data }) {
  const [form] = Form.useForm();
  const [updateConfigEmail, { isLoading }] = useUpdateConfigEmailMutation();
  const [initValues, setInitValues] = useState({
    emailConfigName: data[0]?.emailConfigName,
    emailHost: data[0]?.emailHost,
    emailPort: data[0]?.emailPort,
    emailUser: data[0]?.emailUser,
    emailPass: data[0]?.emailPass,
  });

  const onFinish = (values) => {
    try {
      updateConfigEmail(values);
    } catch (err) {}
  };
  const onFinishFailed = () => {};

  return (
    <div className="mx-5">
      <Form
        size="small"
        form={form}
        name="basic"
        layout="vertical"
        initialValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Config Name"
          name="emailConfigName"
          rules={[
            {
              required: true,
              message: "Please input Config Name!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Host"
          name="emailHost"
          rules={[
            {
              required: true,
              message: "Please input Host!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Port"
          name="emailPort"
          rules={[
            {
              required: true,
              message: "Please input Port!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="User Email"
          name="emailUser"
          rules={[
            {
              required: true,
              message: "Please input User Email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Password"
          name="emailPass"
          rules={[
            {
              required: true,
              message: "Please input Password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="flex justify-center mt-5">
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            shape="round"
            size="large"
          >
            Update Config Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
