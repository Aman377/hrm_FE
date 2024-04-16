import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddDepartment from "./AddDepartment";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import getPermissions from "../../utils/getPermissions";

const Department = () => {
  const [pageConfig, setPageConfig] = useState({
    status: "true",
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetDepartmentsQuery(pageConfig);
  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllDepartment.map((item, index) => ({
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
  ];

  const columnsWithAction = [
    ...initialColumns,

    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-department"}>
          <ViewBtn path={`/admin/department/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];

  const hasReadSingleShiftPermission = permission?.includes(
    "readSingle-department"
  );

  return (
    <div>
      <PageTitle title="Back" />
      <CardCustom
        title={"Department List"}
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
        {permission.length > 0 && (
          <TablePagination
            columns={
              hasReadSingleShiftPermission ? columnsWithAction : initialColumns
            }
            list={updatedData}
            total={data?.totalDepartment}
            setPageConfig={setPageConfig}
            pageConfig={pageConfig}
            permission={"readAll-department"}
            loading={isLoading}
            csvFileName={"departments"}
            searchBy={"Search by name"}
          />
        )}
      </CardCustom>
    </div>
  );
};

export default Department;
