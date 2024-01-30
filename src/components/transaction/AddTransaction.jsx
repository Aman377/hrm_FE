import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";

import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetAccountsQuery } from "../../redux/rtk/features/account/accountApi";
import { useAddTransactionMutation } from "../../redux/rtk/features/transaction/transactionApi";
import BigDrawer from "../Drawer/BigDrawer";
import AddAccount from "../account/AddAccount";

const AddTransaction = () => {
  const navigate = useNavigate();

  const [addTransaction, { isLoading, isSuccess }] =
    useAddTransactionMutation();
  
  const { data: accounts } = useGetAccountsQuery({query: 'sa'});
  const [form] = Form.useForm();
  let [date, setDate] = useState(dayjs());
  const [account, setAccount] = useState({
    debitId: 0,
    creditId: 0,
  });
  
  const onFinish = async (values) => {
    const data = {
      ...values,
      date: date,
      amount: parseInt(values.amount),
      debitId: account.debitId,
      creditId: account.creditId,
    };

    const resp = await addTransaction(data);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/transaction/");
    }
  }, [isSuccess, navigate]);

  return (
    <>
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
        <Form.Item label='Date' required>
          <DatePicker
            defaultValue={dayjs("2015/01/01", "YYYY/MM/DD")}
            format={"YYYY/MM/DD"}
            onChange={(value) => setDate(value?._d)}
            label='date'
            name='date'
            className='date-picker date-picker-transaction-create'
            rules={[
              {
                required: true,
                message: "Please input date!",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          name='debitId'
          label='Debit Account'
        >
          <Space.Compact block>
            <Select
              onChange={(value) => setAccount({ ...account, debitId: value })}
              loading={!accounts}
              showSearch
              placeholder='Select Debit ID'
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
            <BigDrawer  title={"new debit account"} btnTitle={"Debit account"}>
              <AddAccount drawer={true} />
            </BigDrawer>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          name='creditId'
          label='Credit Account'
        >
          <Space.Compact block>
            <Select
              onChange={(value) => setAccount({ ...account, creditId: value })}
              loading={!accounts}
              showSearch
              placeholder='Select Credit ID'
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
            <BigDrawer title={"new credit account"} btnTitle={"Credit account"}>
              <AddAccount drawer={true} />
            </BigDrawer>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Amount'
          name='amount'
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label='Particulars'
          name='particulars'
          rules={[
            {
              required: true,
              message: "Please input particulars!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          className='flex justify-center mt-[24px]'
        >
          <Button
            type='primary'
            htmlType='submit'
            shape='round'
            size='large'
            loading={isLoading}
          >
            Pay Now
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddTransaction;
