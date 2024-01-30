import { Button, Col, Form, Row, Select, Typography } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useUpdateProjectTeamMutation } from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeamApi";
import { useGetUsersQuery } from "../../../redux/rtk/features/user/userApi";

const AddProjectTeamMember = ({ id, projectId, teamName }) => {
  const { data: list, isLoading: loading } = useGetUsersQuery({
    query: "all",
  });
  const [updateProjectTeam, { isLoading }] = useUpdateProjectTeamMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const singleProjectTeam = {
      ...values,
      projectId: projectId,
    };

    const resp = await updateProjectTeam({ id, values: singleProjectTeam });

    if (resp) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding Project Team");
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <Row className="mt-[25px]">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={12}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            {`Add New Team Member :  ${teamName} `}
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
            eventKey="shift-form"
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
              <Form.Item
                style={{ marginBottom: "20px" }}
                label="Member"
                name="projectTeamMember"
                rules={[
                  {
                    required: true,
                    message: "Select Member",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  loading={loading}
                  placeholder="Select Member"
                  optionFilterProp="children"
                >
                  {list?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.firstName} {item.lastName}
                    </Select.Option>
                  ))}
                </Select>
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
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
      {/* </UserPrivateComponent> */}
    </>
  );
};

export default AddProjectTeamMember;
