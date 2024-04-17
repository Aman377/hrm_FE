import { Tag } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import PageTitle from "../page-header/PageHeader";

import { useParams } from "react-router-dom";
import { useGetAttendanceByUserIdQuery } from "../../redux/rtk/features/attendance/attendanceApi";
import CardCustom from "../CommonUi/CardCustom";
import TablePagination from "../CommonUi/TablePagination";
import CreateDrawer from "../CommonUi/CreateDrawer";
import AddAttendance from "./AddAttendance";

const UserAttendance = () => {
  const { id } = useParams("id");
  const [pageConfig, setPageConfig] = useState({ page: 1, count: 10 });
  const { data, isLoading: loading } = useGetAttendanceByUserIdQuery({
    id,
    ...pageConfig,
  });
  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllAttendanceByUserId.map((item, index) => ({
    ...item,
    serialNumber: calculateSerialNumber(
      pageConfig.page,
      pageConfig.count,
      index
    ),
  }));
  const columns = [
    {
      id: 1,
      title: "Sr.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: ({ firstName, lastName }) => firstName + " " + lastName,
    },

    {
      id: 3,
      title: "inTime",
      dataIndex: "inTime",
      key: "inTime",
      render: (inTime) => dayjs(inTime).format("DD-MM-YYYY, h:mm A"),
    },

    {
      id: 4,
      title: "Out Time",
      dataIndex: "outTime",
      key: "outTime",
      render: (outTime) => dayjs(outTime).format("DD-MM-YYYY, h:mm A"),
    },
    {
      id: 4,
      title: "In Status",
      dataIndex: "inTimeStatus",
      key: "inTimeStatus",
      render: (inTimeStatus) => {
        // use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
        if (inTimeStatus === "Late") {
          return <Tag color="red">{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === "Early") {
          return <Tag color="blue">{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === "On Time") {
          return <Tag color="green">{inTimeStatus.toUpperCase()}</Tag>;
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
          return <Tag color="red">{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === "Early") {
          return <Tag color="blue">{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === "On Time") {
          return <Tag color="green">{outTimeStatus.toUpperCase()}</Tag>;
        } else {
          return <Tag style={{ color: "orange" }}>NONE</Tag>;
        }
      },
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
    {
      id: 6,
      title: "Total Hour",
      dataIndex: "totalHour",
      key: "totalHour",
      render: (totalHour) => totalHour || "Not Checked",
    },
  ];
  return (
    <>
      <PageTitle title="Back" />
      <CardCustom
        title={"Attendance History"}
        extra={
          <>
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
          list={updatedData}
          total={data?.totalAttendanceByUserId}
          setPageConfig={setPageConfig}
          pageConfig={pageConfig}
          searchBy={"Search"}
          loading={loading}
          columns={columns}
          csvFileName={"Attendance History"}
          permission={"readSingle-attendance"}
        />
      </CardCustom>
    </>
  );
};

export default UserAttendance;
