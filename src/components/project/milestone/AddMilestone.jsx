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
import React from "react";

import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useAddMilestoneMutation } from "../../../redux/rtk/features/projectManagement/project/milestone/milestoneApi";
import { useGetProjectsQuery } from "../../../redux/rtk/features/projectManagement/project/project/projectApi";

const AddMilestone = ({ isFixed, projectId }) => {
  const { isLoading: loading, data: list } = useGetProjectsQuery();
  const [addSingleMilestone, { isLoading }] = useAddMilestoneMutation();
  const { id } = useParams("id");

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const milestoneData = {
      ...values,
      projectId: !isFixed
        ? values.projectId
        : id
        ? parseInt(id)
        : parseInt(projectId),
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await addSingleMilestone(milestoneData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding Milestone");
  };
  return (
    <>
      <Row className="mt-[25px]" justify={"center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={22}
          xl={22}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            Add Milestone in Project
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div>
              {!isFixed ? (
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
                    disabled={isFixed}
                    loading={loading}
                    placeholder="Select Project"
                    optionFilterProp="children"
                  >
                    {list?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <>
                  {!projectId && (
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="Project"
                      tooltip="Your Project is already selected"
                      name="projectId"
                    >
                      <Input defaultValue={id} disabled />
                    </Form.Item>
                  )}
                </>
              )}

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
                  offset: 6,
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
                  Add Milestone
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddMilestone;
