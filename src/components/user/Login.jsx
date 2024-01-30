import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React from "react";

import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/rtk/features/user/userApi";
import LoginTable from "../Card/LoginTable";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { Title } = Typography;

  const onFinish = async (values) => {
    login(values);
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Error at login Please try again");
  };

  return (
    <>
      <Row className='card-row'>
        <Col span={24}>
          <Card bordered={false} className="w-full max-w-[30rem] mx-auto">
            <Title level={3} className='m-3 text-center'>
              Login
            </Title>
            <Form
              name='basic'
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                className='mb-5'
                label='Username'
                name='username'
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
                className='mb-5'
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <Button type='primary' htmlType='submit' loading={isLoading}>
                  Submit
                </Button>
              </Form.Item>
              <Form.Item className="mt-[30px] flex justify-center">
                <Row>
                  <Col span={24}>
                    <LoginTable />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
