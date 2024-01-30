import { useState } from "react";
import { useGetLeavePoliciesQuery } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../page-header/PageHeader";
import AddLeavePolicy from "./AddLeavePolicy";

const LeavePolicy = () => {
  const [pagConfig, setPageConfig] = useState({status: 'true', page: 1, count: 10});
  const { data, isLoading } = useGetLeavePoliciesQuery(pagConfig);
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
      title: "Total Paid Leave",
      dataIndex: "paidLeaveCount",
      key: "paidLeaveCount",
    },

    {
      id: 3,
      title: "Total Unpaid Leave",
      dataIndex: "unpaidLeaveCount",
      key: "unpaidLeaveCount",
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-leavePolicy"}>
          <ViewBtn path={`/admin/leave-policy/${id}/`} />
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
              permission={"create-leavePolicy"}
              title={"Create Leave Policy"}
              width={35}
            >
              <AddLeavePolicy />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          columns={columns}
          csvFileName={"Leave Policies"}
          list={data?.getAllLeavePolicy}
          total={data?.totalLeavePolicy}
          setPageConfig={setPageConfig}
          loading={isLoading}
          permission={"readAll-leavePolicy"}
        />
      </CardCustom>
    </>
  );
};

export default LeavePolicy;
