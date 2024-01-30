import CardCustom from "../CommonUi/CardCustom";
import PageTitle from "../page-header/PageHeader";

import { useState } from "react";
import { useGetWeeklyHolidaysQuery } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import AddWeeklyHoliday from "./AddWeeklyHoliday";

const WeeklyHoliday = () => {
  const [pagConfig, setPageConfig] = useState({status: 'true', page: 1, count: 10});
  const { data, isLoading } = useGetWeeklyHolidaysQuery(pagConfig);
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
      title: "Start Day",
      dataIndex: "startDay",
      key: "startDay",
    },

    {
      id: 3,
      title: "End Day",
      dataIndex: "endDay",
      key: "endDay",
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/holiday/week/${id}/`} />,
    },
  ];
  return (
    <>
      <PageTitle title='Back' />
      <CardCustom
        title={"Weekly Holiday List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-weeklyHoliday"}
              title={"Create Weekly Holiday"}
              width={35}
            >
              <AddWeeklyHoliday />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          columns={columns}
          list={data?.getAllWeeklyHoliday}
          total={data?.totalWeeklyHoliday}
          setPageConfig={setPageConfig}
          loading={isLoading}
          csvFileName={"Weekly holiday"}
          permission={"readAll-weeklyHoliday"}
        />
      </CardCustom>
    </>
  );
};

export default WeeklyHoliday;
