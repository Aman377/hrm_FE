import { Button, Form, Input, Typography } from "antd";
import { useAddDesignationMutation } from "../../redux/rtk/features/designation/designationApi";

const AddDesignation = () => {
  const { Title } = Typography;
  const [addDesignation, { isLoading }] = useAddDesignationMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await addDesignation(values);
      if (resp.data && !resp.error) {
        form.resetFields();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name='basic'
      layout='vertical'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        style={{ marginBottom: "20px" }}
        label='Name'
        name='name'
        rules={[
          {
            required: true,
            message: "Please input designation name!",
          },
        ]}
      >
        <Input />
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
          block
          htmlType='submit'
          shape='round'
          size='large'
          loading={isLoading}
        >
          Add Designation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDesignation;
