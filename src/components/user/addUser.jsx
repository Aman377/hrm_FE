import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";
import {
  useGetDesignationsQuery,
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetCityQuery,
} from "../../redux/rtk/features/designation/designationApi";
import { useGetEmploymentStatusesQuery } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";
import { useGetLeavePoliciesQuery } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import { useGetShiftsQuery } from "../../redux/rtk/features/shift/shiftApi";
import { useAddUserMutation } from "../../redux/rtk/features/user/userApi";
import { useAddEducationMutation } from "../../redux/rtk/features/user/userApi";
import { useGetWeeklyHolidaysQuery } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import { useGetlastUserQuery } from "../../redux/rtk/features/setting/settingApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import EmployeeEducationForm from "./EmployeeEducationForm";
import { toastHandler } from "../../utils/functions";

const AddUser = () => {
  const { Option } = Select;
  const { data: list } = useGetRolesQuery({ query: "all" });
  const { data: department } = useGetDepartmentsQuery({ query: "all" });
  const [addStaff, { isLoading }] = useAddUserMutation();
  const {
    data: setting,
    isLoading: isFetchingLastUser,
    isError,
  } = useGetlastUserQuery();
  const [addEducation] = useAddEducationMutation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  // const [fileList, setFileList] = useState();
  const [inSetting, setInSetting] = useState();
  const [documentList, setDocumentList] = useState([]);
  const [cvList, setCvList] = useState([]);
  const [addressProofList, setAddressProofList] = useState([]);
  const [addharCardList, setAddharCardList] = useState([]);
  const [panCardList, setPanCardList] = useState([]);
  const [experienceLetterList, setExperienceLetterList] = useState([]);

  // const { data: setting } = useGetlastUserQuery();
  const { data: cities } = useGetCityQuery(selectedState);
  const { data: states } = useGetStatesQuery(selectedCountry);
  const { data: countries } = useGetCountriesQuery();
  const { data: designation } = useGetDesignationsQuery({ query: "all" });
  const { data: employmentStatus } = useGetEmploymentStatusesQuery({
    query: "all",
  });
  const { data: shift } = useGetShiftsQuery({ query: "all" });
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({ query: "all" });
  const { data: leavePolicy } = useGetLeavePoliciesQuery({ query: "all" });

  const [form] = Form.useForm();
  useEffect(() => {
    if (!isFetchingLastUser && setting) {
      form.setFieldsValue({
        remember: true,
        employeeId: getNextEmployeeId(setting),
      });
    }
  }, [isFetchingLastUser, setting, form]);

  // Image
  const uploadRef = useRef();
  const handleImageChange = (fileList, type) => {
    if (type === "document") {
      setDocumentList(fileList);
    } else if (type === "cv") {
      setCvList(fileList);
    } else if (type === "address_proof") {
      setAddressProofList(fileList);
    } else if (type === "aadhar_card") {
      setAddharCardList(fileList);
    } else if (type === "pan_card") {
      setPanCardList(fileList);
    } else if (type === "experience_letter") {
      setExperienceLetterList(fileList);
    }
  };

  const token = localStorage.getItem("access-token");

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const getNextEmployeeId = (employee) => {
    if (employee.validId == false) {
      return employee.actual_emp_id;
    }
    const prefix = employee.employeeId.split("-")[0];
    const parts = employee.employeeId.split("-");
    const number = parseInt(parts[1]);
    const nextNumber = isNaN(number) ? 1 : number + 1;
    return `${prefix}-${nextNumber}`;
  };

  const onFinish = async (values) => {
    // try {
    //   await form.validateFields();
    // } catch (errorInfo) {
    //   console.log('Validation failed:', errorInfo);
    //   toastHandler("Please fill all required details", "warning");
    // }
    const formDataObject = {
      ...values,
    };

    try {
      // Add api call
      const res = await addStaff(formDataObject);
      // console.log(res);
      // if(res.data.status == 200){
      //   toastHandler(res.data.message, "warning");
      //   return;
      // }
      if (res.data.status === 422) {
        toastHandler(res.data.message, "warning");
        return;
      }

      if (!res.error) {
        const documentUploadRes = await uploadDocuments(res);
        if (!documentUploadRes.ok) {
          // show document upload errr
        }
        toastHandler("Registration completed successfully", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // show userr add error
      }
    } catch (error) {}
  };

  const uploadDocuments = async (newlyAddedStaff) => {
    if (!newlyAddedStaff.error && newlyAddedStaff.data) {
      try {
        const formData = new FormData();
        formData.append("user_id", newlyAddedStaff.data.id);
        if (documentList.length) {
          formData.append(
            `document`,
            documentList[0] ? documentList[0].originFileObj : null
          );
          formData.append(`cv`, cvList[0] ? cvList[0].originFileObj : null);
          formData.append(
            `address_proof`,
            addressProofList[0] ? addressProofList[0].originFileObj : null
          );
          formData.append(
            `aadhar_card`,
            addharCardList[0] ? addharCardList[0].originFileObj : null
          );
          formData.append(
            `pan_card`,
            panCardList[0] ? panCardList[0].originFileObj : null
          );
          formData.append(
            `experience_letter`,
            experienceLetterList[0]
              ? experienceLetterList[0].originFileObj
              : null
          );
        }

        const response = await fetch(
          `${import.meta.env.VITE_APP_API}/user/education`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to upload document: ${response.status} ${response.statusText}`
          );
        }

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return error;
      }
    }
  };

  const onFinishFailed = () => {
    toastHandler("Please fill all required details", "warning");
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

  //Validate Salary
  const validateSalary = (rule, value, callback) => {
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      callback("Salary should be number");
    } else if (parsedValue < 0) {
      callback("Salary must be a non-negative number");
    } else {
      callback();
    }
  };

  return (
    <>
      <UserPrivateComponent permission={"create-user"}>
        <div className="mr-top mt-5 p-5 ant-card " style={{ maxWidth: "100%" }}>
          <Form
            size="small"
            form={form}
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 22,
            }}
            initialValues={{
              remember: true,
              employeeId: setting ? getNextEmployeeId(setting) : undefined,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={(changedValues, allValues) => {
              if ("employeeId" in changedValues) {
                form.setFieldsValue({
                  employeeId: changedValues.employeeId,
                });
                console.log("formDataObject", formDataObject);
              }
            }}
          >
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} className="gutter-row form-color">
                <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                  Personal Information
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
                {/* <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='User Name'
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: "Please input User Name!",
                    },
                  ]}
                > */}
                {/* <Input placeholder='john_doe' />
                </Form.Item> */}
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="UserName/Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input UserName/Email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid Email",
                    },
                  ]}
                >
                  <Input placeholder="johndoe2@example.com" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password !",
                    },
                  ]}
                >
                  <Input.Password placeholder="Strong Password" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Phone Number!",
                    },
                  ]}
                >
                  <Input placeholder="015000000000" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Emergency Phone"
                  name="emergency_phone"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Emergency Phone Number!",
                    },
                  ]}
                >
                  <Input placeholder="015000000000" />
                </Form.Item>
              </Col>
              <Col span={12} className="gutter-row">
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
                    // loading={!shift}
                    size="middle"
                    showSearch
                    mode="single"
                    allowClear
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select country"
                    onChange={handleCountryChange}
                  >
                    {countries &&
                      countries.data.map((country) => (
                        <Option key={country.id} value={country.id}>
                          {country.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                {selectedCountry != null ? (
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="State"
                    name="state"
                    rules={[{ required: true, message: "Please input state!" }]}
                  >
                    <Select
                      size="middle"
                      showSearch
                      mode="single"
                      allowClear
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      placeholder="Please select state"
                      onChange={handleStateChange}
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
                {selectedCountry && selectedState != null ? (
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="City"
                    name="city"
                    rules={[{ required: true, message: "Please input city!" }]}
                  >
                    <Select
                      size="middle"
                      showSearch
                      mode="single"
                      allowClear
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      placeholder="Please select city"
                    >
                      {cities &&
                        cities.data.map((city) => (
                          <Option key={city.id} value={city.id}>
                            {city.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                ) : null}
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
                  <Input
                    placeholder="123 Main Street"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Zip Code"
                  name="zipCode"
                  rules={[
                    { required: true, message: "Please input Zip Code!" },
                  ]}
                >
                  <Input placeholder="90211" />
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
              <Col span={12} className="gutter-row">
                <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                  {" "}
                  Employee Information{" "}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Joining Date"
                  name="joinDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input joining date!",
                    },
                  ]}
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Leave Date"
                  name="leaveDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>
                {/* {setting ? */}
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Employee ID"
                  name="employeeId"
                >
                  <Input disabled />
                </Form.Item>
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
                  name={"employmentStatusId"}
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input Employment Status!",
                    },
                  ]}
                  label="Employee Status"
                >
                  <Select
                    placeholder="Select Status"
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
                  label="Department"
                  rules={[
                    { required: true, message: "Please input Department!" },
                  ]}
                >
                  <Select
                    loading={!department}
                    placeholder="Select Department"
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
                  label="Role"
                  name={"roleId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!list}
                    size="middle"
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
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
                  label="Shift"
                  name={"shiftId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!shift}
                    size="middle"
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
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
                  label="Leave Policy"
                  name={"leavePolicyId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!leavePolicy}
                    size="middle"
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
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
                  label="WeekLy Holiday"
                  name={"weeklyHolidayId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!weeklyHoliday}
                    size="middle"
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
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
              <Col span={12} className="gutter-row">
                <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                  Designation & Salary Information
                </h2>

                <Form.Item
                  rules={[
                    { required: true, message: "Please input Designation!" },
                  ]}
                  label="Designation"
                  name={"designationId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!shift}
                    size="middle"
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select Designation"
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
                  label="Designation Start Date"
                  rules={[{ required: true, message: "Please input date!" }]}
                  name="designationStartDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Designation End Date"
                  name="designationEndDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Salary"
                  name="salary"
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
                  label="Salary Start Date"
                  name="salaryStartDate"
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input date!",
                    },
                  ]}
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item>

                {/* <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Salary End Date"
                  name="salaryEndDate"
                >
                  <DatePicker className="date-picker hr-staffs-date-picker" />
                </Form.Item> */}

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Salary Comment"
                  name="salaryComment"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <h2 className="text-center text-xl mt-3 mb-5 txt-color">
              Education Information
            </h2>

            <div className="text-center">
              <p className="text-base mb-4">
                Please add education information
              </p>
            </div>

            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <EmployeeEducationForm
                      key={key}
                      name={name}
                      remove={remove}
                      restField={restField}
                      form={form}
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
                      type="dashed"
                      size="middle"
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

            <h2 className="text-center text-xl mt-5 mb-5 txt-color">
              Document Information
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginInline: "auto",
                paddingBlock: "10px",
              }}
            >
              {/* Document */}
              <Form.Item
                // name="document"
                rules={[{ required: true, message: "Missing document" }]}
                style={{ marginRight: 16 }}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  name="image"
                  maxCount={1}
                  onChange={(info) =>
                    handleImageChange(info.fileList, "document")
                  }
                >
                  <div>
                    <UploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload Document
                    </div>
                  </div>
                </Upload>
                {/* <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={1}
                onChange={(info) =>
                  handleImageChange(info.fileList, "document")
                }
              >
                <Button icon={<UploadOutlined />}>Upload Document</Button>
              </Upload> */}
              </Form.Item>

              {/* CV */}
              <Form.Item rules={[{ required: true, message: "Missing CV" }]}>
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  name="image"
                  // fileList={fileList}
                  maxCount={1}
                  onChange={(info) => handleImageChange(info.fileList, "cv")}
                >
                  <div>
                    <UploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload CV
                    </div>
                  </div>
                </Upload>
                {/* <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={1}
                onChange={(info) => handleImageChange(info.fileList, "cv")}
              >
                <Button icon={<UploadOutlined />}>Upload CV</Button>
              </Upload> */}
              </Form.Item>

              {/* address_proof */}
              <Form.Item
                rules={[{ required: true, message: "Missing document" }]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  name="image"
                  maxCount={1}
                  onChange={(info) =>
                    handleImageChange(info.fileList, "address_proof")
                  }
                >
                  <div>
                    <UploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload Address Proof
                    </div>
                  </div>
                </Upload>
                {/* <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={1}
                onChange={(info) =>
                  handleImageChange(info.fileList, "address_proof")
                }
              >
                <Button icon={<UploadOutlined />}>Upload Address Proof</Button>
              </Upload> */}
              </Form.Item>

              {/* aadhar_card */}
              <Form.Item
                rules={[{ required: true, message: "Missing document" }]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  name="image"
                  maxCount={1}
                  onChange={(info) =>
                    handleImageChange(info.fileList, "aadhar_card")
                  }
                >
                  <div>
                    <UploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload Addhar Card
                    </div>
                  </div>
                </Upload>
                {/* <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={1}
                onChange={(info) =>
                  handleImageChange(info.fileList, "aadhar_card")
                }
              >
                <Button icon={<UploadOutlined />}>Upload Addhar Card</Button>
              </Upload> */}
              </Form.Item>

              {/* pan_card */}
              <Form.Item
                rules={[{ required: true, message: "Missing document" }]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  name="image"
                  maxCount={1}
                  onChange={(info) =>
                    handleImageChange(info.fileList, "pan_card")
                  }
                >
                  <div>
                    <UploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload Pan Card
                    </div>
                  </div>
                </Upload>
                {/* <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={1}
                onChange={(info) =>
                  handleImageChange(info.fileList, "pan_card")
                }
              >
                <Button icon={<UploadOutlined />}>Upload Pan Card</Button>
              </Upload> */}
              </Form.Item>

              {/* experience_letter */}
              <Form.Item
                rules={[{ required: true, message: "Missing document" }]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  name="image"
                  maxCount={1}
                  onChange={(info) =>
                    handleImageChange(info.fileList, "experience_letter")
                  }
                >
                  <div>
                    <UploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload Experience Letter
                    </div>
                  </div>
                </Upload>
                {/* <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={1}
                onChange={(info) =>
                  handleImageChange(info.fileList, "experience_letter")
                }
              >
                <Button icon={<UploadOutlined />}>
                  Upload Experience Letter
                </Button> */}
                {/* </Upload> */}
              </Form.Item>
            </div>

            <Form.Item
              style={{ marginBottom: "10px", marginTop: "10px" }}
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Button
                className="mt-5"
                size="large"
                block
                type="primary"
                htmlType="submit"
                shape="round"
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
