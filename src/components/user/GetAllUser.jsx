import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";
import AttendBtn from "../Buttons/AttendBtn";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddUser from "./addUser";
import PageTitle from "../page-header/PageHeader";

const GetAllUser = () => {
  const [pageConfig, setPageConfig] = useState({ status: "true", page: 1, count: 10 });
  const { data, isLoading } = useGetUsersQuery(pageConfig);
  const [searchText, setSearchText] = useState('');
  const columns = [
    {
      id: 1,
      title: "ID",
      key: "index",
      render: (text, record, index) => index + 1, 
    },
    {
      id: 2,
      title: "Name",

      key: "fullName",
      render: ({ firstName, lastName }) =>
        (firstName + " " + lastName).toUpperCase(),
    },
    {
      id: 3,
      title: "Usr Name",
      dataIndex: "username",
      key: "username",
    },

    {
      id: 5,
      title: "Designation",
      dataIndex: "designationHistory",
      key: "designationHistory",
      render: (record) =>
        record?.length > 0 ? record[0].designation.name : "N/A",
    },

    {
      id: 6,
      title: "E-Status",
      dataIndex: "employmentStatus",
      key: "employmentStatus",
      render: (record) => (record?.name ? record?.name : "N/A"),
    },
    {
      id: 8,
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (record) => (record?.name ? record?.name : "N/A"),
    },

    {
      id: 9,
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      render: (record) => (record?.name ? record?.name : "N/A"),
    },

    {
      id: 7,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className='flex justify-start'>
          <UserPrivateComponent permission={"readSingle-user"}>
            <ViewBtn path={`/admin/hr/staffs/${id}/`} />
          </UserPrivateComponent>
          <UserPrivateComponent permission={"readSingle-attendance"}>
            <AttendBtn path={`/admin/attendance/user/${id}`} />
          </UserPrivateComponent>
        </div>
      ),
    },
  ];

  return (
    <>
    <PageTitle title='Back'/>
    <CardCustom
      title={"Employee List"}
      extra={
        <>
          <StatusSelection setPageConfig={setPageConfig} />
          <CreateDrawer
            permission={"create-user"}
            title={"Create user"}
            width={100}
          >
            <AddUser />
          </CreateDrawer>
        </>
      }
    >

      <TablePagination
        list={data?.getAllUser}
        total={data?.totalUser}
        loading={isLoading}
        setPageConfig={setPageConfig}
        permission={"readAll-user"}
        csvFileName={"users"}
        columns={columns}
        searchText={searchText} 
        setSearchText={setSearchText} 
        searchBy={"Name"}
      />
    </CardCustom>
    </>
  );
};

export default GetAllUser;
