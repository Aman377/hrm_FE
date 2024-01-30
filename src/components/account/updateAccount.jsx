import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import {
  useGetMainAccountQuery,
  useUpdateAccountMutation,
} from "../../redux/rtk/features/account/accountApi";
import Loader from "../loader/loader";

const UpdateAccount = ({ data, id }) => {
  const { data: accounts, isLoading } = useGetMainAccountQuery();
  const [UpdateAccount, { isLoading: addLoading }] = useUpdateAccountMutation();
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const [initValues, setInitValues] = useState({
    name: data?.name,
    accountId: data?.accountId,
  });

  const onFinish = async (values) => {
    try {
      UpdateAccount({ id, values });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Button onClick={showModal} size='small'>
        Update Account
      </Button>
      <Modal
        open={open}
        title='Update Account'
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' type='danger' onClick={handleCancel}>
            cancel
          </Button>,
        ]}
      >
        <Form
          form={form}
          className='m-4'
          name='basic'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            ...initValues,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: "Please input debit account!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            name='accountId'
            label='Account Type'
            rules={[
              {
                required: true,
                message: "Please input debit account!",
              },
            ]}
          >
            <Select
              loading={!accounts}
              showSearch
              style={{
                width: 200,
              }}
              placeholder='Select Account Type'
              optionFilterProp='children'
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {accounts &&
                accounts.map((acc) => (
                  <Select.Option key={acc.id} value={acc.id}>
                    {acc.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button
              block
              type='primary'
              htmlType='submit'
              shape='round'
              loading={addLoading}
            >
              Update Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAccount;
