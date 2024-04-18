import { useEffect, useState } from "react";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useAddManualAttendanceMutation } from "../../redux/rtk/features/attendance/attendanceApi";
import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";

const AddAttendance = ({ drawer }) => {
  const { data: users } = useGetUsersQuery({ query: "all" });
  const [defaultValue, setDefaultValue] = useState("");
  const [loading, setLoading] = useState(true);

  const loggedInUserRole = localStorage.getItem("role");
  const loggedInUserFirstName = localStorage.getItem("firstName");
  const loggedInUserLastName = localStorage.getItem("lastName");
  const loggedInUserId = localStorage.getItem("id");

  useEffect(() => {
    setDefaultValue(`${loggedInUserFirstName} ${loggedInUserLastName}`);
    setLoading(false);
  }, []);

  // console.log("loggedInUser", loggedInUser);

  const [addManualAttendance, { isLoading }] = useAddManualAttendanceMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const [inTimeDate, setInTimeDate] = useState({
    time: null,
    date: null,
  });
  const [outTimeDate, setOutTimeDate] = useState({
    time: null,
    date: null,
  });

  // make a new date variable from inTimeDate state which will contain date and time
  const inTimeDateNew = new Date(inTimeDate.date + " " + inTimeDate.time);

  const outTimeDateNew = new Date(outTimeDate.date + " " + outTimeDate.time);

  const onFinish = async (values) => {
    const FormData = {
      ip: values.ip,
      userId: values.userId,
      comment: values.comment,
      inTime:
        inTimeDateNew !== "Invalid Date"
          ? dayjs(inTimeDateNew).format("YYYY-MM-DD HH:mm:ss")
          : null,
      outTime:
        outTimeDateNew !== "Invalid Date"
          ? dayjs(outTimeDateNew).format("YYYY-MM-DD HH:mm:ss")
          : null,
    };
    console.log("VAUES", FormData);

    const resp = await addManualAttendance(FormData);
    if (resp.data && !resp.error) {
      form.resetFields();
      setInTimeDate("");
      setOutTimeDate("");
    }
  };
  const onFinishFailed = () => {
    toast.warning("Failed at adding shift");
  };

  return (
    <>
      <Title level={4} className="m-2 mt-5 mb-5 text-center">
        Add Manual Attendance
      </Title>
      {inTimeDate.time === null ||
      inTimeDate.date === null ||
      outTimeDate.time === null ||
      outTimeDate.date === null ? (
        <p className="text-center  text-sm font-bold mb-4">
          {" "}
          * Please fill Date and Time
        </p>
      ) : (
        ""
      )}
      <Form
        form={form}
        style={{ marginBottom: "40px" }}
        eventKey="shift-form"
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mx-4"
      >
        <div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="User"
            name="userId"
            rules={[
              {
                required: true,
                message: "Please select an user!",
              },
            ]}
          >
            {/* <Select placeholder="Select User">
              {users?.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.firstName + " " + user.lastName}
                </Select.Option>
              ))}
            </Select> */}
            <Select
              placeholder="Select User"
              defaultValue={
                loggedInUserRole === "2"
                  ? `${loggedInUserFirstName} ${loggedInUserLastName}`
                  : null
              }
            >
              {loggedInUserRole === "2" ? (
                <Select.Option key={loggedInUserId} value={loggedInUserId}>
                  {`${loggedInUserFirstName} ${loggedInUserLastName}`}
                </Select.Option>
              ) : (
                users?.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    {`${user.firstName} ${user.lastName}`}
                  </Select.Option>
                ))
              )}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Start Time"
            name="inTime"
          >
            <div className="flex justify-between">
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(date, dateString) =>
                  setInTimeDate({ ...inTimeDate, date: dateString })
                }
              />
              <TimePicker
                className="ml-4"
                format={"HH:mm:s"}
                onChange={(time, timeString) =>
                  setInTimeDate({ ...inTimeDate, time: timeString })
                }
              />
            </div>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="End Time"
            name="outTime"
          >
            <div className="flex justify-between">
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(date, dateString) =>
                  setOutTimeDate({ ...outTimeDate, date: dateString })
                }
              />
              <TimePicker
                className="ml-4"
                format={"HH:mm:s"}
                onChange={(time, timeString) =>
                  setOutTimeDate({ ...outTimeDate, time: timeString })
                }
              />
            </div>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Comment"
            name="comment"
          >
            <Input placeholder="Comment" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="IP Address"
            name="ip"
          >
            <Input placeholder="127.0.0.1" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button
              type="primary"
              size="large"
              disabled={
                inTimeDate.time === null ||
                inTimeDate.date === null ||
                outTimeDate.time === null ||
                outTimeDate.date === null
              }
              htmlType="submit"
              block
              loading={isLoading}
            >
              Add Attendance
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddAttendance;
