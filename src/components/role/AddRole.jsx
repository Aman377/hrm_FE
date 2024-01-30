import { Button, Card, Col, Form, Input, Row, Table, Typography } from "antd";

import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { useAddRoleMutation } from "../../redux/rtk/features/role/roleApi";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";

const AddRole = () => {
  const [addRole, { isLoading }] = useAddRoleMutation();
  const { Title } = Typography;
  const [form] = useForm();
  const onFinish = async (values) => {
    const res = await addRole(values);
    if (!res.error && res.data) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding role");
  };
  return (
    <Form
      form={form}
      style={{ marginBottom: "100px" }}
      eventKey='role-form'
      name='basic'
    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "20px" }}
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
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
            Add New Role
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddRole;
