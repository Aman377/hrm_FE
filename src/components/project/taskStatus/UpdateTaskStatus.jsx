import { Button, Col, Form, Input, Row, Typography } from "antd";

import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllTaskStatusQuery,
  useUpdateTaskStatusMutation,
} from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatusApi";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";

const UpdateTaskStatus = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { id } = useParams("id");
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  const { data: taskStatus } = useGetAllTaskStatusQuery({
    status: "true",
  });
  const [updateTaskStatus, { isLoading }] = useUpdateTaskStatusMutation();

  useEffect(() => {
    if (taskStatus) {
      setInitialValues(taskStatus);
    }
  }, [taskStatus]);

  const onFinish = async (values) => {
    const taskStatusData = {
      ...values,
    };

    const resp = await updateTaskStatus({ id, values: taskStatusData });
    if (resp) {
      form.resetFields();
      navigate(-1);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding TaskStatus");
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <PageTitle title="Back" />
      <Row className="mt-[25px]">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={16}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            Update Task Status Column
          </Title>
          {initialValues ? (
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
              eventKey="shift-form"
              name="basic"
              initialValues={initialValues}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>
                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label="Task Status Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Enter Task Status Name",
                    },
                  ]}
                >
                  <Input placeholder="Enter Task Status Name" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
                    span: 12,
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    loading={isLoading}
                  >
                    Update Now
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
      {/* </UserPrivateComponent> */}
    </>
  );
};

export default UpdateTaskStatus;
