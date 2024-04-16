import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetShiftsQuery } from "../../redux/rtk/features/shift/shiftApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddShift from "./AddShift";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import getPermissions from "../../utils/getPermissions";

const Shift = (props) => {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const { data, isLoading } = useGetShiftsQuery(pageConfig);
  const [permission, setPermission] = useState([]);

  const fetchData = async () => {
    const response = await getPermissions();
    setPermission(response);
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllShift.map((item, index) => ({
    ...item,
    serialNumber: calculateSerialNumber(
      pageConfig.page,
      pageConfig.count,
      index
    ),
  }));


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
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => dayjs(startTime).format("hh:mm A"),
    },
    {
      id: 4,
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => dayjs(endTime).format("hh:mm A"),
    },
  ];

  const columnsWithAction = [
    ...initialColumns,
    {
      id: 5,
      title: (
        <UserPrivateComponent permission={"readSingle-shift"}>
          Action
        </UserPrivateComponent>
      ),
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-shift"}>
          <ViewBtn path={`/admin/shift/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];

  const hasReadSingleShiftPermission = permission?.includes("readSingle-shift");

  // Only render TablePagination when permission state is updated
  return (
    <div>
      <PageTitle title="Back" />
      <CardCustom
        title={"Shift List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-shift"}
              title={"Add shift"}
              width={30}
            >
              <AddShift />
            </CreateDrawer>
          </>
        }
      >
        {permission.length > 0 && (
          <TablePagination
            list={updatedData}
            total={data?.totalShift}
            columns={hasReadSingleShiftPermission ? columnsWithAction : initialColumns}
            csvFileName={"shift list"}
            loading={isLoading}
            setPageConfig={setPageConfig}
            pageConfig={pageConfig}
            permission={"readAll-shift"}
            searchBy={"Search by name"}
          />
        )}
      </CardCustom>
    </div>
  );
};

export default Shift;
