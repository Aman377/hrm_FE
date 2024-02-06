import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";
import { useGetDesignationsQuery } from "../../redux/rtk/features/designation/designationApi";
import { useGetEmploymentStatusesQuery } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";
import { useGetLeavePoliciesQuery } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import { useGetShiftsQuery } from "../../redux/rtk/features/shift/shiftApi";
import { useAddUserMutation } from "../../redux/rtk/features/user/userApi";
import { useGetWeeklyHolidaysQuery } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import EmployeeEducationForm from "./EmployeeEducationForm";

const AddUser = () => {
  const { Option } = Select;
  const { data: list } = useGetRolesQuery({ query: 'all' });
  const { data: department } = useGetDepartmentsQuery({ query: 'all' });
  const [addStaff, { isLoading }] = useAddUserMutation();

  //  to get designations from redux
  const { data: designation } = useGetDesignationsQuery({ query: "all" });
  const { data: employmentStatus } = useGetEmploymentStatusesQuery({ query: 'all' });
  const { data: shift } = useGetShiftsQuery({ query: 'all' });
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({ query: 'all' });
  const { data: leavePolicy } = useGetLeavePoliciesQuery({ query: 'all' });

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const FormData = {
      ...values,
      education: values.education || [],
    };
    try {
      const res = await addStaff(FormData);
      if (!res.error && res.data) {
        form.resetFields();
      }
    } catch (error) { }
  };

  const onFinishFailed = () => { };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

  //Validate Salary
  const validateSalary = (rule, value, callback) => {
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      callback('Salary should be number');
    } else if (parsedValue < 0) {
      callback('Salary must be a non-negative number');
    } else {
      callback();
    }
  };

  return (
    <>
      <UserPrivateComponent permission={"create-user"}>
        <div className='mr-top mt-5 p-5 ant-card ' style={{ maxWidth: "100%" }}>
          <Form
            size='small'
            form={form}
            name='basic'
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 22,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} className='gutter-row form-color'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  Personal Information
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='First Name'
                  name='firstName'
                  rules={[
                    {
                      required: true,
                      message: "Please input First Name!",
                    },
                  ]}
                >
                  <Input placeholder='John' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Last Name'
                  name='lastName'
                  rules={[
                    {
                      required: true,
                      message: "Please input Last Name!",
                    },
                  ]}
                >
                  <Input placeholder='Doe' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='User Name'
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: "Please input User Name!",
                    },
                  ]}
                >
                  <Input placeholder='john_doe' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Password'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: "Please input your password !",
                    },
                  ]}
                >
                  <Input placeholder='Strong Password' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: "Please input email!",
                    },
                    {
                      type: 'email',
                      message: 'Please enter a valid email address!',
                    },
                  ]}
                >
                  <Input placeholder='johndoe2@example.com' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Phone'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Phone Number!",
                    },
                  ]}
                >
                  <Input placeholder='015000000000' />
                </Form.Item>
              </Col>
              <Col span={12} className='gutter-row'>
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
                  <Input
                    placeholder='123 Main Street'
                    style={{ width: "100%" }}
                  />
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
                  rules={[
                    { required: true, message: "Please input Zip Code!" },
                  ]}
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
              </Col>
            </Row>

            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} className='gutter-row'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  {" "}
                  Employee Information{" "}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Joining Date'
                  name='joinDate'
                  rules={[
                    {
                      required: true,
                      message: "Please input joining date!",
                    },
                  ]}
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Leave Date'
                  name='leaveDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Employee ID'
                  name='employeeId'
                  rules={[
                    {
                      required: true,
                      message: "Please input Employee ID!",
                    },
                  ]}
                >
                  <Input placeholder='OE-012' />
                </Form.Item>
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
                {/* TODO: Add a Upload Seciton for Image */}
                <Form.Item
                  name={"employmentStatusId"}
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input Employment Status!",
                    },
                  ]}
                  label='Employee Status'
                >
                  <Select
                    placeholder='Select Status'
                    allowClear
                    size={"middle"}
                  >
                    {employmentStatus &&
                      employmentStatus.map((employmentStatus) => (
                        <Option
                          key={employmentStatus.id}
                          value={employmentStatus.id}
                        >
                          {employmentStatus.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={"departmentId"}
                  style={{ marginBottom: "10px" }}
                  label='Department'
                  rules={[
                    { required: true, message: "Please input Department!" },
                  ]}
                >
                  <Select
                    loading={!department}
                    placeholder='Select Department'
                    allowClear
                    size={"middle"}
                  >
                    {department &&
                      department.map((department) => (
                        <Option key={department.id} value={department.id}>
                          {department.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input Department!" },
                  ]}
                  label='Role'
                  name={"roleId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!list}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder='Please select'
                  >
                    {list &&
                      list.map((role) => (
                        <Option key={role.id} value={role.id}>
                          {role.name}
                        </Option>
                      ))}
                  </Select>
                  {/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: "Please input Department!" },
                  ]}
                  label='Shift'
                  name={"shiftId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!shift}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder='Please select'
                  >
                    {shift &&
                      shift.map((shift) => (
                        <Option key={shift.id} value={shift.id}>
                          {shift.name}
                        </Option>
                      ))}
                  </Select>
                  {/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: "Please input Department!" },
                  ]}
                  label='Leave Policy'
                  name={"leavePolicyId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!leavePolicy}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder='Please select'
                  >
                    {leavePolicy &&
                      leavePolicy.map((leavePolicy) => (
                        <Option key={leavePolicy.id} value={leavePolicy.id}>
                          {leavePolicy.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: "Please input Department!" },
                  ]}
                  label='WeekLy Holiday'
                  name={"weeklyHolidayId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!weeklyHoliday}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder='Please select'
                  >
                    {weeklyHoliday &&
                      weeklyHoliday.map((weeklyHoliday) => (
                        <Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
                          {weeklyHoliday.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} className='gutter-row'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  Designation & Salary Information
                </h2>

                <Form.Item
                  rules={[
                    { required: true, message: "Please input Designation!" },
                  ]}
                  label='Designation'
                  name={"designationId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!shift}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder='Please select Designation'
                  >
                    {designation &&
                      designation.map((designation) => (
                        <Option key={designation.id} value={designation.id}>
                          {designation.name}
                        </Option>
                      ))}
                  </Select>
                  {/*<BigDrawer
									title={"new Role"}
									btnTitle={"Role"}
									children={<AddRole drawer={true} />}
										/> */}
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Designation Start Date'
                  rules={[{ required: true, message: "Please input date!" }]}
                  name='designationStartDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Designation End Date'
                  name='designationEndDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Salary'
                  name='salary'
                  rules={[
                    {
                      required: true,
                      message: "Please input salary",
                    },
                    {
                      validator: validateSalary,
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label='Salary Start Date'
                  name='salaryStartDate'
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input date!",
                    },
                  ]}
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Salary End Date'
                  name='salaryEndDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Salary Comment'
                  name='salaryComment'
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <h2 className='text-center text-xl mt-3 mb-5 txt-color'>
              Education Information
            </h2>

            <div className='text-center'>
              <p className='text-red-500 text-base mb-4'>
                Please add education information using the button below
              </p>
            </div>

            <Form.List name='education'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <EmployeeEducationForm
                      key={key}
                      name={name}
                      remove={remove}
                      restField={restField}
                    />
                  ))}
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    wrapperCol={{
                      offset: 4,
                      span: 16,
                    }}
                  >
                    <Button
                      type='dashed'
                      size='middle'
                      style={{ color: "#fff", backgroundColor: "#2c3e50" }}
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Education Information
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              style={{ marginBottom: "10px", marginTop: "10px" }}
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Button
                className='mt-5'
                size='large'
                block
                type='primary'
                htmlType='submit'
                shape='round'
                loading={isLoading}
              >
                Add New Employee
              </Button>
            </Form.Item>
          </Form>
        </div>
      </UserPrivateComponent>
    </>
  );
};

export default AddUser;
