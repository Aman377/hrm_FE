import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
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
import getPermissions from "../../utils/getPermissions";

const GetAllUser = () => {
  const [pageConfig, setPageConfig] = useState({
    status: "true",
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetUsersQuery(pageConfig);
  const totalUserCount = data?.totalUser;

  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllUser.map((item, index) => ({
    ...item,
    serialNumber: calculateSerialNumber(
      pageConfig.page,
      pageConfig.count,
      index
    ),
  }));
  const [permission, setPermission] = useState([]);

  const fetchData = async () => {
    const response = await getPermissions();
    setPermission(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialColumns = [
    {
      id: 1,
      title: "Employee Id",
      dataIndex: "employeeId",
      key: "employeeId",
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
      title: "User Name",
      dataIndex: "email",
      key: "email",
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
  ];

  const columnsWithAction = [
    ...initialColumns,
    {
      id: 7,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className="flex justify-start">
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

  const hasReadSingleShiftPermission = permission?.includes("readSingle-user") || permission?.includes("readSingle-attendance");


  // const columns = [
  //   // {
  //   //   id: 1,
  //   //   title: "Sr.No",
  //   //   dataIndex: "serialNumber",
  //   //   key: "serialNumber",
  //   // },
  //   {
  //     id: 1,
  //     title: "Employee Id",
  //     dataIndex: "employeeId",
  //     key: "employeeId",
  //   },
  //   {
  //     id: 2,
  //     title: "Name",
  //     key: "fullName",
  //     render: ({ firstName, lastName }) =>
  //       (firstName + " " + lastName).toUpperCase(),
  //   },
  //   {
  //     id: 3,
  //     title: "User Name",
  //     dataIndex: "email",
  //     key: "email",
  //   },

  //   {
  //     id: 5,
  //     title: "Designation",
  //     dataIndex: "designationHistory",
  //     key: "designationHistory",
  //     render: (record) =>
  //       record?.length > 0 ? record[0].designation.name : "N/A",
  //   },

  //   {
  //     id: 6,
  //     title: "E-Status",
  //     dataIndex: "employmentStatus",
  //     key: "employmentStatus",
  //     render: (record) => (record?.name ? record?.name : "N/A"),
  //   },
  //   {
  //     id: 8,
  //     title: "Department",
  //     dataIndex: "department",
  //     key: "department",
  //     render: (record) => (record?.name ? record?.name : "N/A"),
  //   },

  //   {
  //     id: 9,
  //     title: "Shift",
  //     dataIndex: "shift",
  //     key: "shift",
  //     render: (record) => (record?.name ? record?.name : "N/A"),
  //   },

  //   {
  //     id: 7,
  //     title: "Action",
  //     dataIndex: "id",
  //     key: "action",
  //     render: (id) => (
  //       <div className='flex justify-start'>
  //         <UserPrivateComponent permission={"readSingle-user"}>
  //           <ViewBtn path={`/admin/hr/staffs/${id}/`} />
  //         </UserPrivateComponent>
  //         <UserPrivateComponent permission={"readSingle-attendance"}>
  //           <AttendBtn path={`/admin/attendance/user/${id}`} />
  //         </UserPrivateComponent>
  //       </div>
  //     ),
  //   },
  // ];

  // for (let i = 1; i <= totalUserCount; i++) {
  //   columns.push({
  //     id: 1,
  //     title: "Id",
  //     key: "srNo",
  //     render: (record) => `${i}`,
  //   });
  // }

  return (
    <>
      <PageTitle title="Back" />
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
        {permission.length > 0 && (
          <TablePagination
            list={updatedData}
            total={data?.totalUser}
            loading={isLoading}
            setPageConfig={setPageConfig}
            pageConfig={pageConfig}
            permission={"readAll-user"}
            csvFileName={"users"}
            columns={
              hasReadSingleShiftPermission ? columnsWithAction : initialColumns
            }
            searchBy={"Search by Name and Employee ID"}
          />
        )}
      </CardCustom>
    </>
  );
};

export default GetAllUser;
