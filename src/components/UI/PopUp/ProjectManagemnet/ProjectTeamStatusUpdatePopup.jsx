import { Button, Col, Form, Modal, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { useUpdateProjectTeamStatusMutation } from "../../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeamApi";
import BtnEditSvg from "../../Button/btnEditSvg";

const ProjectTeamStatusUpdatePopup = ({ projectId, teamName, status }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProjectTeamStatus, { isLoading }] =
    useUpdateProjectTeamStatusMutation();
  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const status = {
      ...values,
    };

    const resp = await updateProjectTeamStatus({
      id: projectId,
      values: status,
    });

    if (resp) {
      form.resetFields();
      setIsModalOpen(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding Project Team");
  };
  return (
    <>
      <div>
        <div onClick={showModal} className="text-center mr-2 cursor-pointer">
          <BtnEditSvg size={36} />
        </div>
        <Modal
          title={`Update Satus`}
          okButtonProps={{ style: { display: "none" } }}
          open={isModalOpen}
          onCancel={handleCancel}
        >
          {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
          <Row className="mt-[25px]" justify={"center"}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              className="column-design border rounded card-custom"
            >
              <Title level={4} className="m-2 mt-5 mb-5 text-center">
                {`Update Team Status:  ${teamName}`}
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
                initialValues={{ status: status }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div>
                  <Form.Item
                    style={{ marginBottom: "20px" }}
                    label="Team Status"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Select Team Status",
                      },
                    ]}
                  >
                    <Select
                      mode="single"
                      placeholder="Select Team Status"
                      optionFilterProp="children"
                    >
                      <Select.Option value={true}>Active</Select.Option>
                      <Select.Option value={false}>Inactive</Select.Option>
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
                      Update
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Col>
          </Row>
          {/* </UserPrivateComponent> */}
        </Modal>
      </div>
    </>
  );
};

export default ProjectTeamStatusUpdatePopup;
