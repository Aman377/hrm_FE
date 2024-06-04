import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography, Upload, Select, Tabs, InputNumber } from "antd";
import { useEffect, useState } from "react";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
  useGetCurrencysQuery,
  useUpdateCompanyPayslipMutation
} from "../../redux/rtk/features/setting/settingApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";

const AddDetails = () => {
  const { Title } = Typography;
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const { data: setting } = useGetSettingQuery();
  const { data: currency } = useGetCurrencysQuery();
  const [updateSetting, { isLoading }] = useUpdateSettingMutation();
  const [updateCompanyPayslip] = useUpdateCompanyPayslipMutation();
  const [initValues, setInitValues] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [activeTab, setActiveTab] = useState('1');

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const currencyOptions = currencyData?.data?.map(currency => ({
    value: currency.id,
    label: currency.name,
  }));

  // Tab Change
  const handleTabChange = (key) => {
    console.log("key", key);
    setActiveTab(key);
  };

  const onFinishFirstTab = async (values) => {
    try {
      const formData = new FormData();
      formData.append("companyName", values.companyName);
      formData.append("tagLine", values.tagLine);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("website", values.website);
      formData.append("emp_id", values.empId);
      formData.append("emp_code", values.empCode);
      formData.append("footer", values.footer);
      formData.append("currency", values.currency);
      formData.append("domain", values.domain);
      formData.append("total_leave", values.totalLeave);
      formData.append("_method", "PUT");
      if (fileList.length) {
        formData.append("file_paths", fileList[0].originFileObj);
      }
      console.log(values)

      const resp = await updateSetting(formData);
      if (resp.setting && !resp.error) {
        // toastHandler("Invoice Setting Updated Successfully", "success");
        // window.location.reload();
      }
    } catch (error) { }
  };

  const onFinishSecondTab = async (values) => {
    try {
      const companyFormData = new FormData();
      companyFormData.append("deduction", values.deduction);
      companyFormData.append("otherDeduction", values.otherDeduction);
      companyFormData.append("basicWage", values.basicWage);
      companyFormData.append("hra", values.hra);
      companyFormData.append("otherEarning", values.otherEarning);
      console.log(values)

      const resp = await updateCompanyPayslip(companyFormData);
      if (resp.setting && !resp.error) {
        // toastHandler("Invoice Setting Updated Successfully", "success");
        // window.location.reload();
      }
    } catch (error) { }
  };

  const onFinishFailed = () => { };

  useEffect(() => {
    if (setting) {
      setCurrencyData(currency)
      setInitValues(setting);
    }
  }, [setting, currency]);
  const handelImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <>
      <UserPrivateComponent permission={"create-setting"}>
        <Row className='mt-[25px]' justify='center'>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={11}
            xl={11}
            className='border rounded column-design'
          >
            <Card bordered={false}>
              <Title level={4} className='m-2 mb-4 text-center'>
                Company Setting
              </Title>
              {initValues ? (
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                  <Tabs.TabPane tab="General Settings" key="1" >
                    <Form
                      initialValues={{
                        ...initValues,
                      }}
                      form={form1}
                      name='generalSetting'
                      labelCol={{
                        span: 7,
                      }}
                      labelWrap
                      wrapperCol={{
                        span: 16,
                      }}
                      onFinish={onFinishFirstTab}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                    >
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        fields={[{ name: "Company Name" }]}
                        label='Company Name'
                        name='companyName'
                        rules={[
                          {
                            required: true,
                            message: "Please input Company name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      {/* Id code */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Employee Code'
                        name='empCode'
                        rules={[
                          {
                            required: true,
                            message: "Please input Employee code!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      {/* Id Number */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Employee Id'
                        name='empId'
                        rules={[
                          {
                            required: true,
                            message: "Please input Employee id!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        fields={[{ name: "Tagline" }]}
                        label='Tagline'
                        name='tagLine'
                        rules={[
                          {
                            required: true,
                            message: "Please input Tagline!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Address'
                        name='address'
                        rules={[
                          {
                            required: true,
                            message: "Please input Address!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Phone Number'
                        name='phone'
                        rules={[
                          {
                            required: true,
                            message: "Please input Phone Number!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Email Address'
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: "Please input Email Address!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Website'
                        name='website'
                        rules={[
                          {
                            required: true,
                            message: "Please input Website!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Footer'
                        name='footer'
                        rules={[
                          {
                            required: true,
                            message: "Please input Footer!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label='Warnning'>
                        <p className='font-semibold text-rose-500'>
                          Required image size 180x70 px & transparent png format
                        </p>
                      </Form.Item>

                      <Form.Item label='Upload Logo' valuePropName='fileList'>
                        <Upload
                          listType='picture-card'
                          beforeUpload={() => false}
                          name='image'
                          fileList={fileList}
                          maxCount={1}
                          onChange={handelImageChange}
                        >
                          <div>
                            <UploadOutlined />
                            <div
                              style={{
                                marginTop: 8,
                              }}
                            >
                              Upload
                            </div>
                          </div>
                        </Upload>
                      </Form.Item>

                      <Form.Item
                        label='Currency'
                        name='currency'
                      >
                        <Select
                          showSearch
                          placeholder="Select a currency"
                          optionFilterProp="children"
                          filterOption={filterOption}
                          options={currencyOptions}
                        />
                      </Form.Item>

                      {/* Company Domain */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Email Domain'
                        name='domain'
                        rules={[
                          {
                            required: true,
                            message: "Please input Domain!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      {/* Company Total Leave */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Total Leave'
                        name='totalLeave'
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
                          loading={isLoading && activeTab === '1'}
                        >
                          Update Details
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Payslip Settings" key="2" >
                    <Form
                      initialValues={{
                        ...initValues,
                      }}
                      form={form2}
                      name='basic'
                      labelCol={{
                        span: 7,
                      }}
                      labelWrap
                      wrapperCol={{
                        span: 16,
                      }}
                      onFinish={onFinishSecondTab}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                    >
                      {/* Earnings */}
                      <h1 className="flex justify-center m-4 font-bold text-2xl underline">Earnings</h1>

                      {/* Basic Wage */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Basic Wage'
                        name='basicWage'
                      >
                        <InputNumber min={1} max={100} placeholder="45%" addonAfter="%"
                          size="small"
                        />
                      </Form.Item>

                      {/* HRA */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='HRA'
                        name='hra'
                      >
                        <InputNumber min={1} max={100} placeholder="40%" addonAfter="%"
                          size="small" />
                      </Form.Item>

                      {/* other earning */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Other Allowances'
                        name='otherEarning'
                      >
                        <Input placeholder="20" value={initValues.otherEarning} />
                      </Form.Item>

                      {/* Earnings */}
                      <h1 className="flex justify-center m-4 font-bold text-2xl underline">Deductions</h1>

                      {/* Deduction */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Deduction'
                        name='deduction'
                      >
                        <Input placeholder="200" />
                      </Form.Item>

                      {/* Other field */}
                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Other Deduction'
                        name='otherDeduction'
                      >
                        <Input placeholder="500" />
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
                          loading={isLoading && activeTab === '2'}
                        >
                          Update Details
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>
                </Tabs>
              ) : (
                <Loader />
              )}
            </Card>
          </Col>
        </Row>
      </UserPrivateComponent>
    </>
  );
};

export default AddDetails;
