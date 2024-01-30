import { Button, Col, Form, Input, Row, Typography } from "antd";

import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTaskPriorityQuery,
  useUpdateTaskPriorityMutation,
} from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriorityApi";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";

const UpdateTaskPriority = () => {
  const [initialValues, setInitialValues] = useState(null);
  const { id } = useParams("id");
  const { data: taskPriority } = useGetTaskPriorityQuery(id);
  const [updateTaskPriority, { isLoading }] = useUpdateTaskPriorityMutation();
  useEffect(() => {
    if (taskPriority) {
      setInitialValues(taskPriority);
    }
  }, [taskPriority]);

  const { Title } = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const taskData = {
      ...values,
    };

    const resp = await updateTaskPriority({ id, values: taskData });

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
            Update Task Priority
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
                  label="Task Priority Name"
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

export default UpdateTaskPriority;
