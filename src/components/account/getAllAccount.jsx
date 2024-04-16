import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  accountApi,
  useGetAccountsQuery,
} from "../../redux/rtk/features/account/accountApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddAccount from "./AddAccount";
import getPermissions from "../../utils/getPermissions";

const GetAllAccount = () => {
  const [pageConfig, setPageConfig] = useState({
    query: "sa",
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetAccountsQuery(pageConfig);
  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllSubAccount.map((item, index) => ({
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
      title: "Sr.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      id: 2,
      title: "Account",
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: "Account Type ",
      dataIndex: "account",
      key: "account",
      render: (account) => account?.name,
      responsive: ["md"],
    },
  ];

  const columnsWithAction = [
    ...initialColumns,
    {
      id: 4,
      title: "Action",
      key: "action",
      render: ({ id }) => (
        <div className="flex justify-start align-middle">
          <UserPrivateComponent permission={"readSingle-account"}>
            <ViewBtn path={`/admin/account/${id}`} />
          </UserPrivateComponent>
          <CommonDelete
            permission={"delete-account"}
            deleteThunk={accountApi.endpoints.deleteAccount.initiate}
            id={id}
          />
        </div>
      ),
    },
  ];

  const hasReadSingleShiftPermission = permission?.includes("readSingle-account");

  // const columns = [
  //   {
  //     id: 1,
  //     title: "Sr.No",
  //     dataIndex: "serialNumber",
  //     key: "serialNumber",
  //   },
  //   {
  //     id: 2,
  //     title: "Account",
  //     dataIndex: "name",
  //     key: "name",
  //   },

  //   {
  //     id: 3,
  //     title: "Account Type ",
  //     dataIndex: "account",
  //     key: "account",
  //     render: (account) => account?.name,
  //     responsive: ["md"],
  //   },
  //   {
  //     id: 4,
  //     title: "Action",
  //     key: "action",
  //     render: ({ id }) => (
  //       <div className='flex justify-start align-middle'>
  //         <UserPrivateComponent permission={"readSingle-account"}>
  //           <ViewBtn path={`/admin/account/${id}`} />
  //         </UserPrivateComponent>
  //         <CommonDelete
  //           permission={"delete-account"}
  //           deleteThunk={accountApi.endpoints.deleteAccount.initiate}
  //           id={id}
  //         />
  //       </div>
  //     ),
  //   },
  // ];
  return (
    <CardCustom
      title={"Accounts List"}
      extra={
        <>
          <CreateDrawer
            permission={"create-account"}
            title={"Create Account"}
            width={30}
          >
            <AddAccount />
          </CreateDrawer>
        </>
      }
    >
      {permission.length > 0 && (
        <TablePagination
          list={updatedData}
          total={data?.totalSubAccount}
          setPageConfig={setPageConfig}
          pageConfig={pageConfig}
          loading={isLoading}
          permission={"readAll-account"}
          columns={
            hasReadSingleShiftPermission ? columnsWithAction : initialColumns
          }
          csvFileName={"accounts"}
          searchBy={"Search by account"}
        />
      )}
    </CardCustom>
  );
};

export default GetAllAccount;
