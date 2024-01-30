import { Button, Form, Input, Select, Typography } from "antd";

import {
  useAddAccountMutation,
  useGetMainAccountQuery,
} from "../../redux/rtk/features/account/accountApi";
import Loader from "../loader/loader";

const AddAccount = ({ drawer }) => {
  const { data: accounts, isLoading } = useGetMainAccountQuery();
  const [AddAccount, { isLoading: addLoading }] = useAddAccountMutation();

  const { Title } = Typography;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resp = await AddAccount(values);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Form
      form={form}
      name='basic'
      className='mx-4'
      layout='vertical'
      initialValues={{
        remember: true,
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
        <Input placeholder='Name' />
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
        className='flex justify-center'
      >
        <Button
          type='primary'
          htmlType='submit'
          shape='round'
          size='large'
          loading={addLoading}
        >
          Add New Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAccount;
