import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUpdateRoleMutation, useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import PageTitle from "../page-header/PageHeader";
import { useNavigate } from "react-router";

function UpdateRole() {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const location = useLocation();
  const { data } = location.state;
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const { data: rolesData, refetch: refetchRoles } = useGetRolesQuery({ status: 'true', page: 1, count: 10 });

  const cust = data;
  const [initValues, setInitValues] = useState({
    name: cust.name,
  });

  const onFinish = async (values) => {
    try {
      setInitValues(values);

      await updateRole({ id, values });

      await refetchRoles();

      form.resetFields();
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <PageTitle title={`Back`} />
      <div className="text-center">
        <Card className="mt-2">
          <Row className="mt-[25px]">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={10}
              xl={10}
              className="border rounded column-design"
            >
              <Title level={3} className="m-3 text-center">
                Edit Role Form
              </Title>
              <Form
                initialValues={{
                  ...initValues,
                }}
                form={form}
                className="m-4"
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Name" }]}
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Designation name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    loading={isUpdating}
                    disabled={isUpdating}
                  >
                    Update Now
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default UpdateRole;
