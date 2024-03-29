import { Button, Col, Form, Input, Row, Select, Typography,Space  } from "antd";

import React from "react";

import { toast } from "react-toastify";
import { useGetProjectsQuery } from "../../../redux/rtk/features/projectManagement/project/project/projectApi";
import { useAddProjectTeamMutation } from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeamApi";
import { useGetUsersQuery } from "../../../redux/rtk/features/user/userApi";

const AddProjectTeam = ({ projectId }) => {
  const { data: usersList, isLoading: userListLoading } = useGetUsersQuery({
    query: "all",
  });

  
  const { data: projectList, isLoading: projectListLoading } =
    useGetProjectsQuery();

  const [addSingleProjectTeam, { isLoading: addLoading }] =
    useAddProjectTeamMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();
  const Option = Select.Option;


  const onFinish = async (values) => {
    const singleProjectTeam = {
      ...values,
      projectId: values.projectId ? values.projectId : parseInt(projectId),
    };

    const resp = await addSingleProjectTeam(singleProjectTeam);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = () => {
    toast.warning("Failed at adding Project Team");
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
            Add Team To Project
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
            eventKey="shift-form"
            name="basic"
            labelCol={{
              span: 7,
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
                label="Project Name"
                name="projectId"
                style={{ marginBottom: "10px" }}
                rules={[
                  {
                    required: projectId ? false : true,
                    message: "Select Project",
                  },
                ]}
              >
                {!projectId ? (
                  <Select
                    loading={projectListLoading}
                    showSearch
                    allowClear
                    placeholder="Select Project"
                    optionFilterProp="children"
                  >
                    {projectList?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Input disabled defaultValue={projectId} />
                )}
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Team Name"
                name="projectTeamName"
                rules={[
                  {
                    required: true,
                    message: "Input Team Name",
                  },
                ]}
              >
                <Input placeholder="Team Name" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "40px"}}
                label="Team Member/s"
                name="projectTeamMember"
                rules={[
                  {
                    required: true,
                    message: "Select Team Member/s",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  loading={userListLoading}
                  placeholder="Select Team Member/s"
                  optionFilterProp="children"
                  tokenSeparators={[',']}
                  style={{
                    width: '100%', 
                  }}
                  maxTagCount={1}
                >
                  {usersList?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.firstName + " " + item.lastName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 7,
                  span: 12,
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  loading={addLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddProjectTeam;
