
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { useGetConfigEmailQuery } from "../../redux/rtk/features/emailConfig/emailConfigApi";
import dayjs from "dayjs";
import UpdateEmailConfig from "./UpdateEmailConfig";

const GetAllEmailConfig = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10})
  const { data, isLoading: loading } = useGetConfigEmailQuery();
  const columns = [
    {
      id: 1,
      title: "Name",
      dataIndex: "emailConfigName",
      key: "emailConfigName",
    },
    {
      id: 2,
      title: "Host",
      dataIndex: "emailHost",
      key: "emailHost",
    },
    {
      id: 3,
      title: "Port",
      dataIndex: "emailPort",
      key: "emailPort",
    },
    {
      id: 4,
      title: "Email User",
      dataIndex: "emailUser",
      key: "emailUser",
    },
    {
      id: 5,
      title: "Create date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },

  ];
  return (
    <CardCustom
      title={"Email Config List"}
      extra={
        <>
          <CreateDrawer
            permission={"update-emailConfig"}
            title={"Update Email Config"}
            width={30}
          >
            <UpdateEmailConfig data={data} />
          </CreateDrawer>
        </>
      }
    >
      <TablePagination
        columns={columns}
        list={data}
        total={null}
        setPageConfig={setPageConfig}
        loading={loading}
        csvFileName={"Email Config List"}
        permission={"readAll-emailConfig"}
      />
    </CardCustom>
  );
};

export default GetAllEmailConfig;
