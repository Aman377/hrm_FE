import { Button, Col, DatePicker, Form, Row, Select, Typography } from "antd";

import dayjs from "dayjs";
import React from "react";

import { toast } from "react-toastify";

import { useAddLeaveMutation } from "../../redux/rtk/features/leave/leaveApi";
import getUserFromToken from "../../utils/getUserFromToken";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddLeave = ({ drawer }) => {
  const id = getUserFromToken();
  const [addLeaveApplication, { isLoading }] = useAddLeaveMutation();
  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const leaveData = {
      ...values,
      userId: id,
      leaveFrom: dayjs(values.leaveFrom).format(),
      leaveTo: dayjs(values.leaveTo).format(),
    };

    const resp = await addLeaveApplication(leaveData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
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
                <Form.Item
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
                </Form.Item>

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
                  <DatePicker />
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
                  <DatePicker />
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
      </UserPrivateComponent>
    </>
  );
};

export default AddLeave;
