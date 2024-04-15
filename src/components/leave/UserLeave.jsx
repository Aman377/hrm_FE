import { Tag } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";

import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLeaveHistoryQuery } from "../../redux/rtk/features/leave/leaveApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import TablePagination from "../CommonUi/TablePagination";
import BtnViewSvg from "../UI/Button/btnViewSvg";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const UserLeave = (props) => {
  const { id } = useParams("id");

  const [pageConfig, setPageConfig] = useState({ page: 1, count: 10 });
  const { data, isLoading } = useGetLeaveHistoryQuery({ id, ...pageConfig });
  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllLeaveByUser.map((item, index) => ({
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
      id: 3,
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      id: 4,
      title: "Leave From",
      key: "leaveFrom",
      render: ({ leaveFrom, status, acceptLeaveFrom }) => {
        return status === "ACCEPTED"
          ? dayjs(acceptLeaveFrom).format("DD-MM-YYYY")
          : dayjs(leaveFrom).format("DD-MM-YYYY");
      },
    },
    {
      id: 5,
      title: "Leave To",
      key: "leaveTo",
      render: ({ leaveTo, status, acceptLeaveTo }) => {
        return status === "ACCEPTED"
          ? dayjs(acceptLeaveTo).format("DD-MM-YYYY")
          : dayjs(leaveTo).format("DD-MM-YYYY");
      },
    },
    {
      id: 6,
      title: "Leave Duration",
      dataIndex: "leaveDuration",
      key: "leaveDuration",
      render: (leaveDuration) => {
        if (leaveDuration > 1) {
          return <span>{leaveDuration} days</span>;
        } else {
          return <span>{leaveDuration} day</span>;
        }
      },
    },

    {
      id: 7,
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "ACCEPTED") {
          return <Tag color="green">{status.toUpperCase()}</Tag>;
        } else if (status === "REJECTED") {
          return <Tag color="red">{status.toUpperCase()}</Tag>;
        } else {
          return <Tag color="orange">{status.toUpperCase()}</Tag>;
        }
      },
    },

    {
      id: 7,
      title: "Applied On",
      dataIndex: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY"),
    },

    {
      id: 7,
      title: "Action",
      key: "action",
      render: ({ id }) => (
        <UserPrivateComponent permission={"readSingle-leaveApplication"}>
          <ViewBtn
            path={`/admin/leave/${id}`}
            text="View"
            icon={<BtnViewSvg />}
          />
        </UserPrivateComponent>
      ),
    },
  ];
  return (
    <CardCustom title={"My Leave Application"}>
      <TablePagination
        columns={columns}
        list={updatedData}
        total={data?.totalLeaveByUser}
        setPageConfig={setPageConfig}
        loading={isLoading}
        permission={"readSingle-leaveApplication"}
        searchBy={"Search"}
      />
    </CardCustom>
  );
};

export default UserLeave;
