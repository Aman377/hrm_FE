import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../page-header/PageHeader";
import AddRole from "./AddRole";

const RoleList = () => {
  const [pageConfig, setPageConfig] = useState({ status: 'true', page: 1, count: 10 });
  const { data, isLoading: loading } = useGetRolesQuery(pageConfig);


  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllRole.map((item, index) => ({
    ...item,
    serialNumber: calculateSerialNumber(pageConfig.page, pageConfig.count, index),
  }));

  const columns = [
    {
      id: 1,
      title: "Sr.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      // render: (value) => value.serialNumber,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <>
          <UserPrivateComponent permission={"readSingle-role"}>
            <ViewBtn path={`/admin/role/${id}/`} />
          </UserPrivateComponent>
        </>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title='Back' />
      <CardCustom
        title={"Role List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-role"}
              title={"Create Role"}
              width={30}
            >
              <AddRole />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          permission={"readAll-role"}
          columns={columns}
          list={updatedData}
          total={data?.totalRole}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          loading={loading}
          csvFileName={"Roles"}
          searchBy={"Search by name"}
        />
      </CardCustom>
    </div>
  );
};

export default RoleList;
