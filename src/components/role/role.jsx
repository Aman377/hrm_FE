import dayjs from "dayjs";
import { useState } from "react";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../page-header/PageHeader";
import AddRole from "./AddRole";

const RoleList = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10});
  const { data, isLoading } = useGetRolesQuery(pageConfig);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
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
        title={"Role list"}
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
          list={data?.getAllRole}
          total={data?.totalRole}
          setPageConfig={setPageConfig}
          csvFileName={"Roles"}
          loading={isLoading}
        />
      </CardCustom>
    </div>
  );
};

export default RoleList;
