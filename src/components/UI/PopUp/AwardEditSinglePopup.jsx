import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetAwardsQuery } from "../../../redux/rtk/features/award/awardApi";
import { useUpdateAwardHistoryMutation } from "../../../redux/rtk/features/awardHistory/awardHistoryApi";
import BtnEditSvg from "../Button/btnEditSvg";

const AwardEditSinglePopup = ({ data, setLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: award } = useGetAwardsQuery({query: 'all'});

  const [updateAwardHistory, { isSuccess, isLoading }] =
    useUpdateAwardHistoryMutation();

  const [initialValues, setInitialValues] = useState({
    awardId: data?.awardId,
    awardedDate: dayjs(data?.awardedDate),
    comment: data?.Comment,
  });

  const onFinish = async (values) => {
    const FormData = {
      ...values,
    };
    setLoading(true);

    await updateAwardHistory({ id: data.id, values: FormData });

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
        title={`Edit Award History`}
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
              label='Award'
              name='awardId'
              rules={[
                {
                  required: true,
                  message: "Please input your salary!",
                },
              ]}
            >
              <Select
                name='awardId'
                defaultValue={initialValues.awardId}
                loading={!award}
              >
                {award?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Start Date'
              name='awardedDate'
              rules={[
                {
                  required: true,
                  message: "Please input your start date!",
                },
              ]}
            >
              <DatePicker name='awardedDate' />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Comment'
              name='comment'
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
export default AwardEditSinglePopup;
