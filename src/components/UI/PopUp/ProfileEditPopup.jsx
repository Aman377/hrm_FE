import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetDepartmentsQuery } from "../../../redux/rtk/features/Department/departmentApi";
import { useGetLeavePoliciesQuery } from "../../../redux/rtk/features/leavePolicy/leavePolicyApi";
import { useGetRolesQuery } from "../../../redux/rtk/features/role/roleApi";
import { useGetShiftsQuery } from "../../../redux/rtk/features/shift/shiftApi";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/rtk/features/user/userApi";
import { useDeleteRoleQuery } from "../../../redux/rtk/features/role/roleApi";
import {
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetCityQuery,
} from "../../../redux/rtk/features/designation/designationApi";
import { useGetWeeklyHolidaysQuery } from "../../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import BtnEditSvg from "../Button/btnEditSvg";

const ProfileEditPopup = ({ data }) => {
  const { id } = useParams("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: leavePolicy } = useGetLeavePoliciesQuery({ query: "all" });
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({ query: "all" });
  const { data: shift } = useGetShiftsQuery({ query: "all" });
  // Fetch user data based on the presence of 'id'
  const { data: userData } = useGetUserQuery(1);


  const [user, setUser] = useState([]);

  useEffect(() => {
    if (data) {
      setUser(data);
    } else {
      setUser(userData);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setUser(data);
    } else {
      setUser(userData);
    }
  }, []);

  const { Option } = Select;
  const { data: list } = useGetRolesQuery({ query: "all" });

  const { data: department } = useGetDepartmentsQuery({ query: "all" });
  const { data: countries } = useGetCountriesQuery();
  const [initialValues, setInitialValues] = useState({});
  const [roleId, setRoleId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [shiftId, setShiftId] = useState("");
  const [leavePolicyId, setLeavePolicyId] = useState("");
  const [weeklyHolidayId, setWeeklyHolidayId] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState(user.country?.id);
  const [currentState, setCurrentState] = useState(user.country?.id);
  const [currentCity, setCurrentCity] = useState(user.state?.id);
  const [city, setCity] = useState(user.state?.id);
  const { data: states } = useGetStatesQuery(currentState);
  const { data: cities } = useGetCityQuery(currentCity);
  const [updateUser, { isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setInitialValues({
      firstName: user?.firstName ? user.firstName : "",
      lastName: user?.lastName ? user.lastName : "",
      username: user?.username ? user.username : "",
      email: user?.email ? user.email : "",
      phone: user?.phone ? user.phone : "",
      street: user?.street ? user.street : "",
      city: user.city ? user.city.name : user.city,
      state: user.state ? user.state.name : user.state,
      zipCode: user?.zipCode ? user.zipCode : "",
      country: user.country ? user.country.name : user.country,
      joinDate: dayjs(user?.joinDate),
      leaveDate: user?.leaveDate ? dayjs(user.leaveDate) : null,
      employeeId: user?.employeeId ? user.employeeId : "",
      bloodGroup: user?.bloodGroup ? user.bloodGroup : "",
      image: user?.image ? user.image : "",
      roleId: user?.roleId ? user.roleId : "",
      departmentId: user?.departmentId ? user.departmentId : "",
      shiftId: user?.shiftId ? user.shiftId : "",
      leavePolicyId: user?.leavePolicyId ? user.leavePolicyId : "",
      weeklyHolidayId: user?.weeklyHolidayId ? user.weeklyHolidayId : "",
      addhar_card: user?.addharCard ? user.addharCard : "",
      pan_card: user?.panCard ? user.panCard : ""
    });
  }, [user]);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      await updateUser({
        id: id,
        values: {
          ...values,
          roleId: roleId ? roleId : data.roleId,
          departmentId: departmentId ? departmentId : data.departmentId,
          shiftId: shiftId ? shiftId : data.shiftId,
          leavePolicyId: leavePolicyId ? leavePolicyId : data.leavePolicyId,
          weeklyHolidayId: weeklyHolidayId
            ? weeklyHolidayId
            : data.weeklyHolidayId,
          country: country ? country : data.country.id,
          state: state ? state : data.state.id,
          city: city ? city : data.city.id,
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

  const handleCountyChange = (value) => {
    setCountry(value);
    setState(value);
    setCurrentState(value);
  };
  return (
    <>
      <button onClick={showModal}>
        <BtnEditSvg size={30} />
      </button>
      <Modal
        width={"50%"}
        title="Update Employee Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          size="small"
          form={form}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2 className="text-center text-xl mt-3 mb-3 txt-color">
            User Information
          </h2>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input First Name!",
              },
            ]}
          >
            <Input placeholder="John" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input Last Name!",
              },
            ]}
          >
            <Input placeholder="Doe" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="User Name"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input User Name!",
              },
            ]}
          >
            <Input placeholder="johndoe2@example.com" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input phone!",
              },
            ]}
          >
            <Input placeholder="1234584515" />
          </Form.Item>

          {/* Adhaar card */}
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Addhar Card"
            name="addhar_card"
            rules={[
              {
                required: true,
                message: "Please Enter Addhar Card Number!",
              },
              {
                pattern: /^\d{12}$/,
                message: "Aadhar Card Number must be exactly 12 digits number!",
              },
            ]}
          >
            <Input placeholder="934729384683" />
          </Form.Item>

          {/* Pan card */}
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Pan Card"
            name="pan_card"
            rules={[
              {
                required: true,
                message: "Please Enter Pan Card Number!",
              },
              {
                pattern: /^[A-Za-z0-9]{10}$/,
                message: "PAN Card Number must be exactly 10 alphanumeric characters!",
              },
            ]}
          >
            <Input placeholder="A78NF6K5H2" />
          </Form.Item>

          <h2 className="text-center text-xl mt-3 mb-3 txt-color">
            Address Information
          </h2>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input Country!" }]}
          >
            <Select
              onChange={(value) => {
                handleCountyChange(value);
              }}
              placeholder="Select Country"
              allowClear
              mode="single"
              size="middle"
              style={{
                width: "100%",
              }}
            >
              {countries &&
                countries.data.map((country) => (
                  <Option key={country.id} value={country.id}>
                    {country.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {states ? (
            <Form.Item
              style={{ marginBottom: "10px" }}
              label="State"
              name="state"
              rules={[{ required: true, message: "Please input state!" }]}
            >
              <Select
                onChange={(value) => {
                  setState(value);
                  setCurrentCity(value);
                  setCity(value);
                }}
                placeholder="Select State"
                allowClear
                mode="single"
                size="middle"
                style={{
                  width: "100%",
                }}
              >
                {states &&
                  states.data.map((state) => (
                    <Option key={state.id} value={state.id}>
                      {state.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          ) : null}
          <Form.Item
            onChange={(value) => setCity(value)}
            style={{ marginBottom: "10px" }}
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input city!" }]}
          >
            <Select
              onChange={(value) => {
                setCity(value);
              }}
              placeholder="Select City"
              allowClear
              mode="single"
              size="middle"
              style={{
                width: "100%",
              }}
            >
              {cities &&
                cities.data.map((city) => (
                  <Option key={city.id} value={city.id}>
                    {city.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Street"
            name="street"
            rules={[
              {
                required: true,
                message: "Please input street!",
              },
            ]}
          >
            <Input placeholder="123 Main Street" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Zip Code"
            name="zipCode"
            rules={[{ required: true, message: "Please input Zip Code!" }]}
          >
            <Input placeholder="90211" />
          </Form.Item>

          <h2 className="text-center text-xl mt-3 mb-3 txt-color">
            {" "}
            Employee Information{" "}
          </h2>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Joining Date"
            name="joinDate"
            valuePropName="date"
            rules={[
              {
                required: true,
                message: "Please input joining date!",
              },
            ]}
          >
            <DatePicker
              className="date-picker hr-staffs-date-picker"
              defaultValue={initialValues.joinDate}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Leave Date"
            name="leaveDate"
            valuePropName="leaveDate"
          >
            <DatePicker
              className="date-picker hr-staffs-date-picker"
              defaultValue={initialValues.leaveDate}
            />
          </Form.Item>
          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Blood Group"
            name="bloodGroup"
            rules={[
              {
                required: true,
                message: "Please input Blood Group!",
              },
            ]}
          >
            <Select
              placeholder="Select Blood Group"
              allowClear
              defaultValue={initialValues.bloodGroup}
              mode="single"
              size="middle"
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
            name={"departmentId"}
            style={{ marginBottom: "10px" }}
            label="Department"
            rules={[{ required: true, message: "Please input Department!" }]}
          >
            <Select
              onChange={(value) => setDepartmentId(value)}
              placeholder="Select Department"
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
          <Form.Item
            rules={[
              {
                required: true,
                message: "Pleases Select Type!",
              },
            ]}
            label="Role"
            name={"roleId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              onChange={(value) => setRoleId(value)}
              defaultValue={initialValues.roleId}
              loading={!list}
              size="middle"
              mode="single"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select Role"
            >
              {list &&
                list.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Pleases Select Type!",
              },
            ]}
            label="Shift"
            name={"shiftId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              onChange={(value) => setShiftId(value)}
              defaultValue={initialValues.shiftId}
              loading={!shift}
              size="middle"
              mode="single"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select shift"
            >
              {shift &&
                shift.map((shift) => (
                  <Option key={shift.id} value={shift.id}>
                    {shift.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Pleases Select Type!",
              },
            ]}
            label="Leave Policy"
            name={"leavePolicyId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              onChange={(value) => setLeavePolicyId(value)}
              defaultValue={initialValues.leavePolicyId}
              loading={!leavePolicy}
              size="middle"
              mode="single"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select leavePolicy"
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
              {
                required: true,
                message: "Pleases Select Type!",
              },
            ]}
            label="Weekly Holiday"
            name={"weeklyHolidayId"}
            style={{ marginBottom: "10px" }}
          >
            <Select
              onChange={(value) => setWeeklyHolidayId(value)}
              defaultValue={initialValues.weeklyHolidayId}
              loading={!weeklyHoliday}
              size="middle"
              mode="single"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select weeklyHoliday"
            >
              {weeklyHoliday &&
                weeklyHoliday.map((weeklyHoliday) => (
                  <Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
                    {weeklyHoliday.name}
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
              className="mt-5"
              block
              type="primary"
              shape="round"
              htmlType="submit"
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
export default ProfileEditPopup;
