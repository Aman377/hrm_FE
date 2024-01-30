import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMilestoneQuery,
  useUpdateMilestoneMutation,
} from "../../../redux/rtk/features/projectManagement/project/milestone/milestoneApi";
import { useGetProjectsQuery } from "../../../redux/rtk/features/projectManagement/project/project/projectApi";
import { toastHandler } from "../../../utils/functions";
import Loader from "../../loader/loader";

const UpdateMilestone = () => {
  const { id } = useParams("id");
  const { data: milestone, loading } = useGetMilestoneQuery(id);
  const { data: list } = useGetProjectsQuery();
  const [updateMilestone, { isLoading }] = useUpdateMilestoneMutation();
  const [initialState, setInitialState] = useState(null);

  useEffect(() => {
    if (milestone) {
      setInitialState({
        ...milestone,
        startDate: dayjs(milestone.startDate),
        endDate: dayjs(milestone.endDate),
      });
    }
  }, [milestone]);

  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const milestoneData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await updateMilestone({ id, values: milestoneData });

    if (resp.data && !resp.error) {
      form.resetFields();
      navigate(-1);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toastHandler("Failed at adding Milestone", "warning");
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <Row className="mt-[25px]" justify={"center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={18}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            Update Milestone
          </Title>
          {initialState ? (
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
              name="basic"
              initialValues={initialState}
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
                  style={{ marginBottom: "10px" }}
                  label="Project"
                  name="projectId"
                  rules={[
                    {
                      required: true,
                      message: "Select Project",
                    },
                  ]}
                >
                  <Select
                    mode="single"
                    loading={loading}
                    placeholder="Select Project"
                    optionFilterProp="children"
                  >
                    {list.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Milestone Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Enter Milestone Name",
                    },
                  ]}
                >
                  <Input placeholder="Enter Milestone Name" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Start Date"
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input Project Start Date!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label="End Date"
                  name="endDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input Project End Date!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Milestone Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Enter Milestone Description",
                    },
                  ]}
                >
                  <Input placeholder="Enter Milestone Description" />
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
                    Submit
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

export default UpdateMilestone;
