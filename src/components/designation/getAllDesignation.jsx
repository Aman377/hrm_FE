import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetDesignationsQuery } from "../../redux/rtk/features/designation/designationApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddDesignation from "./addDesignation";
import getPermissions from "../../utils/getPermissions";


const GetAllDesignation = () => {
  const [pageConfig, setPageConfig] = useState({
    status: "true",
    page: 1,
    count: 10,
  });
  const { data, isLoading: loading } = useGetDesignationsQuery(pageConfig);

  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllDesignation.map((item, index) => ({
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
      render: (name, { id }) => (
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
    },
  ];

  const columnsWithAction = [
    ...initialColumns,

    {
      id: 3,
      title: "Action",
      key: "action",
      render: ({ id }) => (
        <UserPrivateComponent permission={"readSingle-designation"}>
          <ViewBtn path={`/admin/designation/${id}`} />
        </UserPrivateComponent>
      ),
    },
  ];

  const hasReadSingleShiftPermission = permission?.includes(
    "readSingle-designation"
  );

   
  return (
    <CardCustom
      title={"Designation List"}
      extra={
        <>
          <CreateDrawer
            permission={"create-designation"}
            title={"Create Designation"}
            width={30}
          >
            <AddDesignation />
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
          total={data?.totalDesignation}
          setPageConfig={setPageConfig}
          pageConfig={pageConfig}
          loading={loading}
          csvFileName={"designations"}
          permission={"readAll-designation"}
          searchBy={"Search by name"}
        />
      )}
    </CardCustom>
  );
};

export default GetAllDesignation;
