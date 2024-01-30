import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

import dayjs from "dayjs";
import React from "react";

import { toast } from "react-toastify";

import { useAddProjectMutation } from "../../redux/rtk/features/projectManagement/project/project/projectApi";
import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";
import PageTitle from "../page-header/PageHeader";

const AddProject = ({ drawer }) => {
  const { data: list, isLoading: listLoading } = useGetUsersQuery({
    query: "all",
  });
  const [addSingleProject, { isLoading }] = useAddProjectMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await addSingleProject(projectData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = () => {
    toast.warning("Failed at adding Project");
  };
  return (
    <>
      <PageTitle title={"Back"} />
      <Row className='mt-4' justify={"center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={drawer ? 22 : 18}
          xl={drawer ? 22 : 16}
          className='column-design border rounded card-custom'
        >
          <Title level={4} className='m-2 mt-5 mb-5 text-center'>
            Add New Project
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
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
                label='Project Manager'
                name='projectManagerId'
                rules={[
                  {
                    required: true,
                    message: "Select Project Manager",
                  },
                ]}
              >
                <Select
                  loading={listLoading}
                  mode='single'
                  showSearch
                  placeholder='Select Project Manager'
                  optionFilterProp='children'
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
                label='Project Name'
                name='name'
                rules={[
                  {
                    required: true,
                    message: "Enter Project Name",
                  },
                ]}
              >
                <Input placeholder='Enter Project Name' />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label='Start Date'
                name='startDate'
                rules={[
                  {
                    required: true,
                    message: "Please input Project Start Date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "20px" }}
                label='End Date'
                name='endDate'
                rules={[
                  {
                    required: true,
                    message: "Please input Project End Date!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "20px" }}
                label='Project Description'
                name='description'
                rules={[
                  {
                    required: true,
                    message: "Enter Project Description",
                  },
                ]}
              >
                <Input.TextArea placeholder='Enter Project Description' />
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
                  size='large'
                  htmlType='submit'
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
    </>
  );
};

export default AddProject;
