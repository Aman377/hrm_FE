import dayjs from "dayjs";
import { useState } from "react";
import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddDepartment from "./AddDepartment";

const Department = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10});
  const { data, isLoading } = useGetDepartmentsQuery(pageConfig);
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
      render: (id) => <ViewBtn path={`/admin/department/${id}/`} />,
    },
  ];
  return (
    <>
      <PageTitle title='Back' />
      <CardCustom
        title={"Department list"}
        extra={
          <CreateDrawer
            permission={"create-department"}
            title={"Create Department"}
            width={30}
          >
            <AddDepartment />
          </CreateDrawer>
        }
      >
        <TablePagination
          columns={columns}
          list={data?.getAllDepartment}
          total={data?.totalDepartment}
          setPageConfig={setPageConfig}
          permission={"readAll-department"}
          loading={isLoading}
          csvFileName={"departments"}
        />
      </CardCustom>
    </>
  );
};

export default Department;
