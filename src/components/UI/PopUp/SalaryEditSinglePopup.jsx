import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateSalaryHistoryMutation } from "../../../redux/rtk/features/salaryHistory/salaryHistoryApis";
import BtnEditSvg from "../Button/btnEditSvg";

const SalaryEditSinglePopup = ({ data, setLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateSalaryHistory, { isSuccess, isLoading }] =
    useUpdateSalaryHistoryMutation();

  const [initialValues, setInitialValues] = useState({
    salary: data?.salary,
    salaryStartDate: dayjs(data?.startDate),
    salaryEndDate: data?.endDate && dayjs(data?.endDate),
    salaryComment: data?.comment,
  });

  const onFinish = async (values) => {
    setLoading(true);
    const id = data.id || "";

    const infoData = {
      ...values,
      salary: parseInt(values.salary),
    };

    await updateSalaryHistory({ id, values: infoData });

    if (isSuccess) {
      setInitialValues({});

      setIsModalOpen(false);
      setLoading(false);
      window.location.reload();
    } else {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding designation");
    setLoading(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);

    setLoading(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setLoading(false);
  };

  return (
    <>
      <button onClick={showModal} className='mr-2'>
        <BtnEditSvg size={20} />
      </button>
      <Modal
        title={`Edit Salary History- ${data?.id}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          style={{ marginBottom: "100px" }}
          eventKey='design-form'
          initialValues={initialValues}
          name='basic'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <div>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Salary'
              name='salary'
              rules={[
                {
                  required: true,
                  message: "Please input your salary!",
                },
              ]}
            >
              <Input name='salary' />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Start Date'
              name='salaryStartDate'
              rules={[
                {
                  required: true,
                  message: "Please input your start date!",
                },
              ]}
            >
              <DatePicker name='salaryStartDate' />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='End Date'
              name='salaryEndDate'
            >
              <DatePicker defaultValue={initialValues.salaryEndDate} />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Comment'
              name='salaryComment'
            >
              <Input name='salaryComment' />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              wrapperCol={{
                offset: 6,
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
                Update Now
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default SalaryEditSinglePopup;
