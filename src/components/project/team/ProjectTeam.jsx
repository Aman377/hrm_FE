import PageTitle from "../../page-header/PageHeader";
import AddProjectTeam from "./AddProjectTeam";

import { useState } from "react";
import {
  projectTeamApi,
  useGetProjectTeamsQuery,
  useGetProjectTeamQuery
} from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeamApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonDelete from "../../CommonUi/CommonDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import TablePagination from "../../CommonUi/TablePagination";
import ProjectTeamStatusUpdatePopup from "../../UI/PopUp/ProjectManagemnet/ProjectTeamStatusUpdatePopup";

const ProjectTeam = () => {
  const [pageConfig, setPageConfig] = useState({ status: "Active", page: 1, count: 10 });
  const { data, isLoading } = useGetProjectTeamsQuery(pageConfig) ;

  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllProjectTeam.map((item, index) => ({
    ...item,
    serialNumber: calculateSerialNumber(pageConfig.page, pageConfig.count, index),
  }));
  const columns = [
    {
      id: 1,
      title: "Sr.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      id: 2,
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status == "Active" ? "Active" : "InActive"),
    },
    {
      id: 3,
      title: "Team Name",
      dataIndex: "projectTeamName",
      key: "projectTeamName",
    },
    {
      id: 4,
      title: "Action",
      key: "action",
      render: ({ id, projectTeamName, status }) => (
        <div className='flex justify-start items-center'>
          <ViewBtn path={`/admin/team/${id}`} />
          <ProjectTeamStatusUpdatePopup
            projectId={id}
            teamName={projectTeamName}
            status={status}
          />
          <CommonDelete
            permission={"delete-projectTeam"}
            deleteThunk={projectTeamApi.endpoints.deleteProjectTeam.initiate}
            id={id}
            navigatePath={"/admin/team"}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title='Back' />

      <CardCustom
        title={"Team List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-projectTeam"}
              title={"Create team"}
            >
              <AddProjectTeam />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          loading={isLoading}
          columns={columns}
          list={updatedData}
          total={data?.totalProjectTeam}
          setPageConfig={setPageConfig}
          pageConfig={pageConfig}
          csvFileName={"Team list"}
          permission={"readAll-projectTeam"}
          searchBy={"Search by team name"}
        />
      </CardCustom>
    </div>
  );
};

export default ProjectTeam;
