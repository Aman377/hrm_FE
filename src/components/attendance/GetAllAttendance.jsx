import "bootstrap-icons/font/bootstrap-icons.css";
import { Navigate } from "react-router-dom";

import { DatePicker, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { useGetAttendancePaginatedQuery } from "../../redux/rtk/features/attendance/attendanceApi";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddAttendance from "./AddAttendance";

const GetAllAttendance = (props) => {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startdate: dayjs().startOf("month"),
    enddate: dayjs().endOf("month"),
  });
  const { data, isLoading } = useGetAttendancePaginatedQuery(pageConfig);

  const { RangePicker } = DatePicker;

  const onCalendarChange = (dates) => {
    const startdate = (dates?.[0]).format("YYYY-MM-DD");
    const enddate = (dates?.[1]).format("YYYY-MM-DD");
    setPageConfig((prev) => {
      return { ...prev, startdate, enddate };
    });
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 10,
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => `${user?.firstName} ${user?.lastName}`,
    },
    {
      id: 2,
      title: "In Time",
      dataIndex: "inTime",
      key: "inTime",
      render: (inTime) => dayjs(inTime).format("DD-MM-YYYY, h:mm A") || "NONE",
    },
    {
      id: 3,
      title: "Out Time ",
      dataIndex: `outTime`,
      key: "outTime",
      render: (outTime) =>
        dayjs(outTime).format("DD-MM-YYYY, h:mm A") || "NONE",
    },
    {
      id: 4,
      title: "In Status",
      dataIndex: "inTimeStatus",
      key: "inTimeStatus",
      render: (inTimeStatus) => {
        // use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
        if (inTimeStatus === "Late") {
          return <Tag color='red'>{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === "Early") {
          return <Tag color='blue'>{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === "On Time") {
          return <Tag color='green'>{inTimeStatus.toUpperCase()}</Tag>;
        } else {
          return <Tag style={{ color: "orange" }}>NONE</Tag>;
        }
      },
    },
    {
      id: 5,
      title: "Out Status",
      dataIndex: "outTimeStatus",
      key: "outTimeStatus",
      render: (outTimeStatus) => {
        // use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
        if (outTimeStatus === "Late") {
          return <Tag color='red'>{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === "Early") {
          return <Tag color='blue'>{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === "On Time") {
          return <Tag color='green'>{outTimeStatus.toUpperCase()}</Tag>;
        } else {
          return <Tag style={{ color: "orange" }}>NONE</Tag>;
        }
      },
    },
    {
      id: 6,
      title: "Total Hour",
      dataIndex: "totalHour",
      key: "totalHour",
      render: (totalHour) => totalHour || "Not Checked",
    },

    {
      id: 7,
      title: "Punch By",
      dataIndex: "punchBy",
      key: "punchBy",
      render: (punchBy) => (
        <span>
          {punchBy[0]?.firstName + " " + punchBy[0]?.lastName || "Not Checked"}
        </span>
      ),
    },
  ];
  return (
    <>
      <PageTitle title='Back' />
      <CardCustom
        title={"Attendance List"}
        extra={
          <>
            <RangePicker
              onCalendarChange={onCalendarChange}
              defaultValue={[pageConfig.startdate, pageConfig.enddate]}
              format={"DD-MM-YYYY"}
              className='range-picker mr-3'
              style={{ maxWidth: "400px" }}
            />
            <CreateDrawer
              permission={"create-attendance"}
              title={"Add Attendance"}
              width={35}
            >
              <AddAttendance />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          list={data?.getAllAttendance}
          total={data?.totalAttendance}
          setPageConfig={setPageConfig}
          loading={isLoading}
          columns={columns}
          csvFileName={"attendance"}
          permission={"readAll-attendance"}
        />
      </CardCustom>
    </>
  );
};

export default GetAllAttendance;
