import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useGetUserQuery,
    useUpdateUserMutation,
} from "../../../redux/rtk/features/user/userApi";
import BtnEditSvg from "../Button/btnEditSvg";

const ContactEditPopup = ({ data }) => {
    const { id } = useParams("id");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: user } = useGetUserQuery(id);
    const { Option } = Select;
    const [initialValues, setInitialValues] = useState({});
    const [updateUser, { isSuccess, isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setInitialValues({
            email: user?.email ? user.email : "",
            phone: user?.phone ? user.phone : "",
            street: user?.street ? user.street : "",
            city: user?.city ? user.city : "",
            state: user?.state ? user.state : "",
            zipCode: user?.zipCode ? user.zipCode : "",
            country: user?.country ? user.country : "",
            bloodGroup: user?.bloodGroup ? user.bloodGroup : "",
        });
    }, [user]);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await updateUser({
                id: id,
                values: {
                    ...values,

                },
            });

            if (isSuccess) {
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={showModal}>
                <BtnEditSvg size={25} />
            </button>
            <Modal
                width={"50%"}
                title='Update Employee Information'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    size='small'
                    form={form}
                    name='basic'
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    {/* Email */}
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: "Please input email!",
                            },
                        ]}
                    >
                        <Input placeholder='johndoe2@example.com' />
                    </Form.Item>

                    {/* phone */}
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Phone'
                        name='phone'
                        rules={[
                            {
                                required: true,
                                message: "Please input phone!",
                            },
                        ]}
                    >
                        <Input placeholder='1234584515' />
                    </Form.Item>

                    {/* Blood group */}
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Blood Group'
                        name='bloodGroup'
                        rules={[
                            {
                                required: true,
                                message: "Please input Blood Group!",
                            },
                        ]}
                    >
                        <Select
                            placeholder='Select Blood Group'
                            allowClear
                            defaultValue={initialValues.bloodGroup}
                            mode='single'
                            size='middle'
                            style={{
                                width: "100%",
                            }}
                        >
                            {bloodGroups.map((bloodGroup) => (
                                <Option key={bloodGroup} value={bloodGroup}>
                                    {bloodGroup}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Address Information */}
                    <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                        Address Information
                    </h2>
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Street'
                        name='street'
                        rules={[
                            {
                                required: true,
                                message: "Please input street!",
                            },
                        ]}
                    >
                        <Input placeholder='123 Main Street' style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='City'
                        name='city'
                        rules={[{ required: true, message: "Please input city!" }]}
                    >
                        <Input placeholder='Los Angeles' />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='State'
                        name='state'
                        rules={[{ required: true, message: "Please input state!" }]}
                    >
                        <Input placeholder='CA' />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Zip Code'
                        name='zipCode'
                        rules={[{ required: true, message: "Please input Zip Code!" }]}
                    >
                        <Input placeholder='90211' />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        label='Country'
                        name='country'
                        rules={[{ required: true, message: "Please input Country!" }]}
                    >
                        <Input placeholder='USA' />
                    </Form.Item>


                    <Form.Item
                        style={{ marginBottom: "10px", marginTop: "10px" }}
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Button
                            className='mt-5'
                            block
                            type='primary'
                            shape='round'
                            htmlType='submit'
                            loading={isLoading}
                        >
                            Update Employee
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ContactEditPopup;
