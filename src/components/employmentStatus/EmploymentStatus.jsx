import { useEffect, useState } from "react";
import { useGetEmploymentStatusesQuery } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";

import AddEmploymentStatus from "./AddEmploymentStatus";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import getPermissions from "../../utils/getPermissions";

const EmploymentStatus = () => {
  const [pageConfig, setPageConfig] = useState({
    status: "true",
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetEmploymentStatusesQuery(pageConfig);
  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllEmploymentStatus.map((item, index) => ({
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
      title: "Color Code",
      dataIndex: "colourValue",
      key: "colourValue",
      render: (colourValue) => (
        <div className="flex">
          <div
            className="rounded border border-gray-200"
            style={{
              marginRight: "10px",
              width: "20px",
              height: "20px",
              backgroundColor: colourValue,
            }}
          ></div>
          {colourValue}
        </div>
      ),
    },

    {
      id: 4,
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const columnsWithAction = [
    ...initialColumns,
    {
      id: 5,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-employmentStatus"}>
          <ViewBtn path={`/admin/employment-status/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];

  const hasReadSingleShiftPermission = permission?.includes(
    "readSingle-employmentStatus"
  );

  return (
    <div>
      <PageTitle title="Back" />

      <CardCustom
        title={"Employment Status List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-employmentStatus"}
              title={"Add employment status"}
              width={30}
            >
              <AddEmploymentStatus />
            </CreateDrawer>
          </>
        }
      >
        {permission.length > 0 && (
          <TablePagination
            columns={
              hasReadSingleShiftPermission ? columnsWithAction : initialColumns
            }
            list={updatedData}
            total={data?.totalEmploymentStatus}
            setPageConfig={setPageConfig}
            pageConfig={pageConfig}
            loading={isLoading}
            csvFileName={"employment status"}
            permission={"readAll-employmentStatus"}
            searchBy={"Search by name"}
          />
        )}
      </CardCustom>
    </div>
  );
};

export default EmploymentStatus;
