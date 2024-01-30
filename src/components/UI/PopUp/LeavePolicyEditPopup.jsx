import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateLeavePolicyMutation } from "../../../redux/rtk/features/leavePolicy/leavePolicyApi";
import BtnEditSvg from "../Button/btnEditSvg";

const LeavePolicyEdit = ({ data }) => {
  const [updateLeavePolicy, { isLoading }] = useUpdateLeavePolicyMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams("id");

  const onFinish = async (values) => {
    const FormData = {
      ...values,
      paidLeaveCount: parseInt(values.paidLeaveCount),
      unpaidLeaveCount: parseInt(values.unpaidLeaveCount),
    };
    await updateLeavePolicy({ id, values: FormData });
  };

  const initialValues = {
    name: data?.name,
    paidLeaveCount: data?.paidLeaveCount,
    unpaidLeaveCount: data?.unpaidLeaveCount,
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding department");
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={showModal}>
        <BtnEditSvg size={36} />
      </button>
      <Modal
        title='Leave Policy Edit'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          style={{ marginBottom: "50px" }}
          eventKey='department-form'
          initialValues={{ ...initialValues }}
          name='basic'
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 12,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <div>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: "Please input Leave Policy name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Paid Leave'
              name='paidLeaveCount'
              rules={[
                {
                  required: true,
                  message: "Please input your Paid Leave!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Unpaid Leave'
              name='unpaidLeaveCount'
              rules={[
                {
                  required: true,
                  message: "Please input your Unpaid Leave!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              wrapperCol={{
                offset: 7,
                span: 12,
              }}
            >
              <Button
                type='primary'
                size='small'
                htmlType='submit'
                block
                loading={isLoading}
              >
                Update Leave Policy
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default LeavePolicyEdit;
