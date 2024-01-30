import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "../../redux/rtk/features/setting/settingApi";
import fileConfig from "../../utils/fileConfig";
import { toastHandler } from "../../utils/functions";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";
const AddDetails = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { data } = useGetSettingQuery();
  const [updateSetting, { isLoading }] = useUpdateSettingMutation();

  const [initValues, setInitValues] = useState(null);
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("companyName", values.companyName);
      formData.append("tagLine", values.tagLine);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("website", values.website);
      formData.append("footer", values.footer);
      formData.append("_method", "PUT");
      if (fileList.length) {
        if (fileConfig() === "laravel") {
          formData.append("files[]", fileList[0].originFileObj);
        }
      }

      const resp = await updateSetting(formData);
      if (resp.data && !resp.error) {
        toastHandler("Invoice Setting Updated Successfully", "success");
        window.location.reload();
      }
    } catch (error) {}
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    if (data) {
      setInitValues(data);
    }
  }, [data]);
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
                <Form
                  initialValues={{
                    ...initValues,
                  }}
                  form={form}
                  name='basic'
                  labelCol={{
                    span: 7,
                  }}
                  labelWrap
                  wrapperCol={{
                    span: 16,
                  }}
                  onFinish={onFinish}
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
                      Update Details
                    </Button>
                  </Form.Item>
                </Form>
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
