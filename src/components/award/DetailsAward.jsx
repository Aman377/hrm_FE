import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import {
  awardApi,
  useGetAwardQuery,
} from "../../redux/rtk/features/award/awardApi";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AwardEditPopup from "../UI/PopUp/AwardEditPopup";
import PageTitle from "../page-header/PageHeader";
import CardCustom from "../CommonUi/CardCustom";
import TableNoPagination from "../CommonUi/TableNoPagination";

//PopUp


const DetailAward = () => {
  const { id } = useParams();
  const { data: award ,isLoading} = useGetAwardQuery(id);
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
      key: "user",
      dataIndex: "user",
      render: (user) => user?.firstName + " " + user?.lastName,
    },

    {
      id: 6,
      title: "Awarded Date",
      dataIndex: "awardedDate",
      key: "awardedDate",
      render: (awardedDate) => dayjs(awardedDate).format("DD/MM/YYYY"),
    },

    {
      id: 5,
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
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
      <UserPrivateComponent permission={"readSingle-award"}>
        <CardCustom
          title={
            <h3>
              ID : {award?.id} | {award?.name}
            </h3>
          }
          extra={
            <div className="flex justify-end items-center">
              <AwardEditPopup data={award} />
              <CommonDelete
                id={id}
                permission={"delete-award"}
                deleteThunk={awardApi.endpoints.deleteAward.initiate}
                navigatePath={-1}
              />
            </div>
          }
        >
          <TableNoPagination
            leftElement={
              <h1 className="p-2 font-semibold text-lg text-center">
                Employee List
              </h1>
            }
            list={award?.awardHistory}
            loading={isLoading}
            columns={columns}
            permission={"readSingle-award"}
            csvFileName={"get award employ list"}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailAward;
