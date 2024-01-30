import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
    employmentStatusApi,
    useGetEmploymentStatusQuery,
} from "../../redux/rtk/features/employemntStatus/employmentStatusApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import TableNoPagination from "../CommonUi/TableNoPagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../page-header/PageHeader";

//PopUp

const DetailEmploymentStatus = () => {
  const { id } = useParams();

  const { data: employmentStatus ,isLoading} = useGetEmploymentStatusQuery(id);
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
       key: "firstName",
       render: ({ firstName, lastName }) => firstName + " " + lastName,
     },

     {
       id: 6,
       title: "User Name",
       dataIndex: "username",
       key: "username",
     },
     {
       id: 7,
       title: "Start Time",
       dataIndex: "startTime",
       key: "startTime",
       render: (startTime) => dayjs(startTime).format("hh:mm A"),
     },
     {
       id: 8,
       title: "End Time",
       dataIndex: "endTime",
       key: "endTime",
       render: (endTime) => dayjs(endTime).format("hh:mm A"),
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
      <UserPrivateComponent permission={"readSingle-employmentStatus"}>
        <CardCustom
          title={
            <h3>
              ID : {employmentStatus?.id} | {employmentStatus?.name}
            </h3>
          }
          extra={
            <div className="flex justify-end">
              {/* <UserPrivateComponent
                      permission={"update-employmentStatus"}
                    >
                      <EmploymentStatusEditPopup data={employmentStatus} />
                    </UserPrivateComponent> */}

              <CommonDelete
                navigatePath={"/admin/employment-status/"}
                permission={"delete-employmentStatus"}
                deleteThunk={
                  employmentStatusApi.endpoints.deleteEmploymentStatus.initiate
                }
                id={id}
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
            list={employmentStatus?.user}
            loading={isLoading}
            columns={columns}
            permission={"readSingle-employmentStatus"}
            csvFileName={"Employee List"}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailEmploymentStatus;
