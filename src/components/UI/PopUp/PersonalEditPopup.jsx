import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetDepartmentsQuery } from "../../../redux/rtk/features/Department/departmentApi";
import { useGetEmploymentStatusesQuery } from "../../../redux/rtk/features/employemntStatus/employmentStatusApi";
import { useGetLeavePoliciesQuery } from "../../../redux/rtk/features/leavePolicy/leavePolicyApi";
import { useGetRolesQuery } from "../../../redux/rtk/features/role/roleApi";
import { useGetShiftsQuery } from "../../../redux/rtk/features/shift/shiftApi";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/rtk/features/user/userApi";
import { useGetWeeklyHolidaysQuery } from "../../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import BtnEditSvg from "../Button/btnEditSvg";

const PersonEditPopup = ({ data }) => {
  const { id } = useParams("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: leavePolicy } = useGetLeavePoliciesQuery({ query: 'all' });
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({ query: 'all' });
  const { data: shift } = useGetShiftsQuery({ query: 'all' });
  const { data: user } = useGetUserQuery(id);

  const { Option } = Select;
  const { data: list } = useGetRolesQuery({ query: 'all' });

  const { data: department } = useGetDepartmentsQuery({ query: 'all' });
  const { data: empStatus } = useGetEmploymentStatusesQuery({ query: 'all' });
  const [initialValues, setInitialValues] = useState({});

  const [roleId, setRoleId] = useState("");
  const [employmentStatusId, setEmployeeStatus] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [shiftId, setShiftId] = useState("");
  const [leavePolicyId, setLeavePolicyId] = useState("");
  const [weeklyHolidayId, setWeeklyHolidayId] = useState("");
  const [updateUser, { isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setInitialValues({
      departmentId: user?.departmentId ? user.departmentId : "",
      employmentStatusId: user?.employmentStatusId ? user.employmentStatusId : "",
      joinDate: dayjs(user?.joinDate),
      leaveDate: user?.leaveDate ? dayjs(user.leaveDate) : null,
      roleId: user?.roleId ? user.roleId : "",
      leavePolicyId: user?.leavePolicyId ? user.leavePolicyId : "",
      weeklyHolidayId: user?.weeklyHolidayId ? user.weeklyHolidayId : "",
      shiftId: user?.shiftId ? user.shiftId : "",
    });
  }, [user]);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await updateUser({
        id: id,
        values: {
          ...values,
          departmentId: departmentId ? departmentId : data.departmentId,
          employmentStatusId: employmentStatusId ? employmentStatusId : data.employmentStatusId,
          roleId: roleId ? roleId : data.roleId,
          shiftId: shiftId ? shiftId : data.shiftId,
          leavePolicyId: leavePolicyId ? leavePolicyId : data.leavePolicyId,
          weeklyHolidayId: weeklyHolidayId
            ? weeklyHolidayId
            : data.weeklyHolidayId,
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

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

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
          {/* Department */}
          <Form.Item
            name={"departmentId"}
            style={{ marginBottom: "10px" }}
            label='Department'
            rules={[{ required: true, message: "Please input Department!" }]}
          >
            <Select
              onChange={(value) => setDepartmentId(value)}
              placeholder='Select Department'
              allowClear
              size={"middle"}
              defaultValue={initialValues.departmentId}
            >
              {department &&
                department.map((department) => (
                  <Option key={department.id} value={department.id}>
                    {department.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {/* Employee Status */}
          <Form.Item
            name={"employmentStatusId"}
            style={{ marginBottom: "10px" }}
            label='Employee Status'
            rules={[{ required: true, message: "Please input EmploymentStatus!" }]}
          >
            <Select
              onChange={(value) => setEmployeeStatus(value)}
              placeholder='Select Department'
              allowClear
              size={"middle"}
              defaultValue={initialValues.employmentStatusId}
            >
              {empStatus &&
                empStatus.map((empStatus) => (
                  <Option key={empStatus.id} value={empStatus.id}>
                    {empStatus.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {/* Joining Date */}
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Joining Date'
            name='joinDate'
            valuePropName='date'
            rules={[
              {
                required: true,
                message: "Please input joining date!",
              },
            ]}
          >
            <DatePicker
              className='date-picker hr-staffs-date-picker'
              defaultValue={initialValues.joinDate}
            />
          </Form.Item>

          {/* Leave Date */}
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Leave Date'
            name='leaveDate'
            valuePropName='leaveDate'
          >
            <DatePicker
              className='date-picker hr-staffs-date-picker'
              defaultValue={initialValues.leaveDate}
            />
          </Form.Item>

          {/* Role */}
          {/* <Form.Item
            rules={[
              {
                required: true,
                message: "Pleases Select Type!",
              },
            ]}
            label='Role'
            name={"roleId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              onChange={(value) => setRoleId(value)}
              defaultValue={initialValues.roleId}
              loading={!list}
              size='middle'
              mode='single'
              allowClear
              style={{
                width: "100%",
              }}
              placeholder='Please select Role'
            >
              {list &&
                list.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
            </Select>
          </Form.Item> */}

          {/* Leave Policy */}
          <Form.Item
            rules={[
              {
                required: true,
                message: "Pleases Select Type!",
              },
            ]}
            label='Leave Policy'
            name={"leavePolicyId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              onChange={(value) => setLeavePolicyId(value)}
              defaultValue={initialValues.leavePolicyId}
              loading={!leavePolicy}
              size='middle'
              mode='single'
              allowClear
              style={{
                width: "100%",
              }}
              placeholder='Please select leavePolicy'
            >
              {leavePolicy &&
                leavePolicy.map((leavePolicy) => (
                  <Option key={leavePolicy.id} value={leavePolicy.id}>
                    {leavePolicy.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {/* Weekly Holiday */}
          <Form.Item
            rules={[
              {
                required: true,
                message: "Pleases Select Type!",
              },
            ]}
            label='Weekly Holiday'
            name={"weeklyHolidayId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              onChange={(value) => setWeeklyHolidayId(value)}
              defaultValue={initialValues.weeklyHolidayId}
              loading={!weeklyHoliday}
              size='middle'
              mode='single'
              allowClear
              style={{
                width: "100%",
              }}
              placeholder='Please select weeklyHoliday'
            >
              {weeklyHoliday &&
                weeklyHoliday.map((weeklyHoliday) => (
                  <Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
                    {weeklyHoliday.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {/* Shift */}
          <Form.Item
						rules={[
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label='Shift'
						name={"shiftId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setShiftId(value)}
							defaultValue={initialValues.shiftId}
							loading={!shift}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select shift'>
							{shift &&
								shift.map((shift) => (
									<Option key={shift.id} value={shift.id}>
										{shift.name}
									</Option>
								))}
						</Select>
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
export default PersonEditPopup;
