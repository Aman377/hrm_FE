import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetDesignationsQuery } from "../../redux/rtk/features/designation/designationApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddDesignation from "./addDesignation";

const GetAllDesignation = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10})
  const { data, isLoading: loading } = useGetDesignationsQuery(pageConfig);

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
      render: (name, { id }) => (
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
    },

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
      <TablePagination
        columns={columns}
        list={data?.getAllDesignation}
        total={data?.totalDesignation}
        setPageConfig={setPageConfig}
        loading={loading}
        csvFileName={"designations"}
        permission={"readAll-designation"}
      />
    </CardCustom>
  );
};

export default GetAllDesignation;
