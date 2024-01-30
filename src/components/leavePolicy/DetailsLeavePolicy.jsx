import { Card, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import {
  leavePolicyApi,
  useGetLeavePolicyQuery,
} from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import CommonDelete from "../CommonUi/CommonDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import LeavePolicyEdit from "../UI/PopUp/LeavePolicyEditPopup";
import CardCustom from "../CommonUi/CardCustom";
import TableNoPagination from "../CommonUi/TableNoPagination";

//PopUp



const DetailLeavePolicy = () => {
  const { id } = useParams();
  const { data: leavePolicy ,isLoading:loading} = useGetLeavePolicyQuery(id);
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
       title: "Paid Leave",
       key: "paidLeaveCount",
       render: () => leavePolicy?.paidLeaveCount,
     },

     {
       id: 6,
       title: "Unpaid Leave",
       key: "unpaidLeaveCount",
       render: () => leavePolicy?.unpaidLeaveCount,
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
      <UserPrivateComponent permission={"readSingle-leavePolicy"}>
        <CardCustom
          title={
            <h3>
              ID : {leavePolicy?.id} | {leavePolicy?.name}
            </h3>
          }
          extra={
            <div className="flex justify-end items-center">
              <UserPrivateComponent permission={"update-leavePolicy"}>
                <LeavePolicyEdit data={leavePolicy} />
              </UserPrivateComponent>

              <CommonDelete
                permission={"delete-leavePolicy"}
                id={id}
                deleteThunk={
                  leavePolicyApi.endpoints.deleteLeavePolicy.initiate
                }
                navigatePath={"/admin/leave-policy"}
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
            list={leavePolicy?.user}
            loading={loading}
            columns={columns}
            permission={"readSingle-leavePolicy"}
            csvFileName={"Employee leave policy list "}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailLeavePolicy;
