import { Button, Col, DatePicker, Form, Row, Select, Typography, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAddLeaveMutation, useGetLeaveByIdQuery } from "../../redux/rtk/features/leave/leaveApi";
import getUserFromToken from "../../utils/getUserFromToken";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import getLocalStorageData from "../../utils/getLocalStorageData";

const AddLeave = ({ drawer }) => {

  const userId = getLocalStorageData('id')
  const id = getUserFromToken();
  const [addLeaveApplication, { isLoading }] = useAddLeaveMutation();
  const { data: availableLeaveData } = useGetLeaveByIdQuery(id);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [leaveData, setLeaveData] = useState(null);

  // Date validation
  const currentDate = dayjs();
  const maxDate = currentDate.add(2, 'month');

  const disabledDate = (current) => {
    return current && (current < currentDate.startOf('day') || current > maxDate.endOf('day'));
  };

  const onFinish = async (values) => {
    const leaveFrom = dayjs(values.leaveFrom);
    const leaveTo = dayjs(values.leaveTo);
    const totalLeaveDays = leaveTo.diff(leaveFrom, 'day') + 1;
    const leaveData = {
      ...values,
      userId: id,
      leaveFrom: leaveFrom.format(),
      leaveTo: leaveTo.format(),
    };
    if (totalLeaveDays > availableLeaveData?.data?.total_available_leave) {
      setLeaveData(leaveData);
      setShowConfirmModal(true);
    } else {
      const resp = await addLeaveApplication(leaveData);

      if (resp.data && !resp.error) {
        form.resetFields();
      }
    }
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    const resp = await addLeaveApplication(leaveData);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding shift");
  };
  return (
    <>
      <UserPrivateComponent permission={"create-leaveApplication"}>
        <Row className='mt-4' justify={"center"}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={drawer ? 22 : 16}
            xl={drawer ? 22 : 12}
            className='column-design border rounded card-custom'
          >
            <Title level={4} className='m-2 mt-5 mb-5 text-center'>
              Application for Leave
            </Title>
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
              name='basic'
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <div>
                {/* <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Leave Type'
                  name='leaveType'
                  rules={[
                    {
                      required: true,
                      message: "Please input your shift!",
                    },
                  ]}
                >
                  <Select
                    mode='single'
                    placeholder='Select leave type'
                    optionFilterProp='children'
                  >
                    <Select.Option value='PAID'>PAID</Select.Option>
                    <Select.Option value='UNPAID'>UNPAID</Select.Option>
                  </Select>
                </Form.Item> */}

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Start Date'
                  name='leaveFrom'
                  rules={[
                    {
                      required: true,
                      message: "Please input your shift!",
                    },
                  ]}
                >
                  <DatePicker disabledDate={disabledDate} />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label='End Date'
                  name='leaveTo'
                  rules={[
                    {
                      required: true,
                      message: "Please input your shift!",
                    },
                  ]}
                >
                  <DatePicker disabledDate={disabledDate} />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 6,
                    span: 12,
                  }}
                >
                  <Button
                    type='primary'
                    size='large'
                    htmlType='submit'
                    block
                    loading={isLoading}
                  >
                    Submit Leave
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
        <Modal
          title="Exceeding Available Leave"
          visible={showConfirmModal}
          onOk={handleConfirm}
          onCancel={handleCancel}
        >
          <p>You have only {availableLeaveData?.data?.total_available_leave} available leave days. Do you want to proceed?</p>
        </Modal>
      </UserPrivateComponent>
    </>
  );
};

export default AddLeave;
