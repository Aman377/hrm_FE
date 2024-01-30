import dayjs from "dayjs";
import { useState } from "react";
import { useGetAwardsQuery } from "../../redux/rtk/features/award/awardApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddAward from "./AddAward";

function GetAllAward() {
  const [pageConfig, setPageConfig] = useState({page: 1, count: 10 , status: 'true'});
  const { data, isLoading } = useGetAwardsQuery(pageConfig);

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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      render: (id) => <ViewBtn path={`/admin/award/${id}/`} />,
    },
  ];

  return (
    <>
      <PageTitle title='Back' />

      <CardCustom
        title={"Award List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-award"}
              title={"Create Award"}
              width={30}
            >
              <AddAward />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          csvFileName={"Award"}
          loading={isLoading}
          columns={columns}
          list={data?.getAllAward}
          total={data?.totalAward}
          setPageConfig={setPageConfig}
          permission={"readAll-award"}
        />
      </CardCustom>
    </>
  );
}

export default GetAllAward;
