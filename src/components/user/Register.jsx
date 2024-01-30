import { Button, Card, Col, Form, Input, Radio, Row, Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../redux/rtk/features/user/userApi";
import Main from "../layouts/Main";

const Register = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const [addStaff, { isLoading, isSuccess }] = useAddUserMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      addStaff(values);

      if (isSuccess) {
        form.resetFields();
        navigate("/admin/auth/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Main>
      <Row className="mt-[25px]">
        <Col span={12} offset={4}>
          <Card bordered={false} className="criclebox h-full">
            <Title level={3} className="m-3 text-center">
              Register
            </Title>
            <Form
              form={form}
              className="m-4"
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Security Key"
                name="key"
                rules={[
                  {
                    required: true,
                    message: "Please input your security key !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Pleases Select Type!",
                  },
                ]}
                label="Staff Type "
                name={"role"}
                style={{ marginBottom: "10px" }}
              >
                <Radio.Group>
                  <Radio value="user"> Staff </Radio>
                  <Radio value="admin"> Admin </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                className="mb-2"
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={isLoading}
                >
                  Register
                </Button>
              </Form.Item>
              <h6 className="text-center mt-2">
                Already have an account ?{" "}
                <Link to={"/admin/auth/login"}>Login Here</Link>
              </h6>
            </Form>
          </Card>
        </Col>
      </Row>
    </Main>
  );
};

export default Register;
