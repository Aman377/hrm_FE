import { useParams } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";
import PageTitle from "../page-header/PageHeader";

import {
  useGetWeeklyHolidayQuery,
  weeklyHolidayApi,
} from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import CommonDelete from "../CommonUi/CommonDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import WeeklyHolidayEdit from "../UI/PopUp/WeeklyHolidayEditPopup";
import CardCustom from "../CommonUi/CardCustom";
import TableNoPagination from "../CommonUi/TableNoPagination";

//PopUp

const DetailWeeklyHoliday = () => {
  const { id } = useParams();

  const { data: weeklyHoliday, isLoading: loading } =
    useGetWeeklyHolidayQuery(id);
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      id: 2,
      title: " Name",
      key: "name",

      render: ({ firstName, lastName }) => firstName + " " + lastName,
    },

    {
      id: 6,
      title: "Start Day",
      key: "startDay",
      render: () => weeklyHoliday?.startDay,
    },

    {
      id: 6,
      title: "End Day",
      key: "endDay",
      render: () => weeklyHoliday?.endDay,
    },

    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-user"}>
          <ViewBtn path={`/admin/hr/staffs/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title=" Back  " />

      <UserPrivateComponent permission={"readSingle-weeklyHoliday"}>
        <CardCustom
          title={
            <h3>
              ID : {weeklyHoliday?.id} | {weeklyHoliday?.name}
            </h3>
          }
          extra={
            <div className="flex justify-end items-center">
              <UserPrivateComponent permission={"update-weeklyHoliday"}>
                <WeeklyHolidayEdit data={weeklyHoliday} />
              </UserPrivateComponent>

              <CommonDelete
                id={id}
                permission={"delete-weeklyHoliday"}
                deleteThunk={
                  weeklyHolidayApi.endpoints.deleteWeeklyHoliday.initiate
                }
                navigatePath={"/admin/holiday/week"}
              />
            </div>
          }
        >
          <TableNoPagination
            leftElement={
              <h1 className="p-2 font-semibold text-lg text-center">
                User List
              </h1>
            }
            list={weeklyHoliday?.user}
            loading={loading}
            columns={columns}
            permission={"readSingle-weeklyHoliday"}
            csvFileName={"Holiday employee list"}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailWeeklyHoliday;
