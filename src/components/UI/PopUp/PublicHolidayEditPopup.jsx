import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdatePublicHolidayMutation } from "../../../redux/rtk/features/publicHoliday/publicHolidayApi";
import BtnEditSvg from "../Button/btnEditSvg";

const PublicHolidayEdit = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams("id");
  const [updatePublicHolyday, { isLoading }] = useUpdatePublicHolidayMutation();

  const onFinish = async (values) => {
    await updatePublicHolyday({ id, values });
  };

  const initialValues = {
    name: data?.name,
    date: dayjs(data?.date),
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
        title='Public Holiday Edit'
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
                  message: "Please input name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Date'
              name='date'
              rules={[{ required: true, message: "Please select date!" }]}
            >
              <DatePicker />
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
                Update Public Holiday
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default PublicHolidayEdit;
