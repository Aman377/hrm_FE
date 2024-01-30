import { useState } from "react";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";

import dayjs from "dayjs";
import { useGetPublicHolidaysQuery } from "../../redux/rtk/features/publicHoliday/publicHolidayApi";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddPublicHoliday from "./AddPublicHoliday";

const PublicHoliday = () => {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const { data, isLoading } = useGetPublicHolidaysQuery(pageConfig);

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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },

    {
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-publicHoliday"}>
          <ViewBtn path={`/admin/holiday/public/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];
  return (
    <>
      <PageTitle title='Back' />
      <CardCustom
        title={"Public Holiday List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-publicHoliday"}
              title={"Create Public Holiday"}
              width={35}
            >
              <AddPublicHoliday />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          columns={columns}
          list={data?.getAllPublicHoliday}
          total={data?.totalPublicHoliday}
          setPageConfig={setPageConfig}
          loading={isLoading}
          csvFileName={"Public holyday list"}
          permission={"readAll-publicHoliday"}
        />
      </CardCustom>
    </>
  );
};

export default PublicHoliday;
