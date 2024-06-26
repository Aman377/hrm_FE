import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectTeamQuery, projectTeamApi, useGetProjectTeamsQuery } from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeamApi";
import ViewBtn from "../../Buttons/ViewBtn";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";
import AddProjectTeamMember from "./AddProjectTeamMember";
import CommonDelete from "../../CommonUi/CommonDelete";
import { useNavigate } from "react-router-dom";

const DetailProjectTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams("id");

  const { data: ProjectTeam, isLoading: teamLoading, refetch } = useGetProjectTeamQuery(id);
  const [columnsToShow, setColumnsToShow] = useState([]);

  useEffect(() => {
    const columns = [
      {
        id: 1,
        title: "ID",
        key: "userId",
        render: (text, record, index) => index + 1,
      },
      {
        id: 2,
        title: "Name",
        key: "username",
        render: ({ user }) => user?.firstName + " " + user?.lastName,
      },
      {
        id: 4,
        title: "Action",
        dataIndex: "userId",
        key: "action",
        render: (userId, record) => (
          <div className='flex justify-start'>
            <UserPrivateComponent permission={"readSingle-user"}>
              <ViewBtn path={`/admin/hr/staffs/${userId}/`} />
            </UserPrivateComponent>

            {/* delete */}
            <CommonDelete
              permission={"delete-projectTeam"}
              deleteThunk={projectTeamApi.endpoints.deleteProjectTeamMember.initiate}
              id={record.id}
              onDeleted={() => refetch()}
            />
          </div>
        ),
      },
    ];
    setColumnsToShow(columns);
  }, [id, navigate]);

  return (
    <>
      {ProjectTeam ? (
        <div>
          <PageTitle title='Back' />
          {ProjectTeam && (
            <AddProjectTeamMember
              id={id}
              projectId={ProjectTeam.projectId}
              teamName={ProjectTeam.projectTeamName}
            />
          )}
          <Card className='mb-4'>
            <div className='flex justify-between mb-8'>
              <h1 className='text-lg '>
                {" "}
                <span className='font-semibold'>Project :</span>{" "}
                {ProjectTeam.project?.name}
              </h1>
              <h1 className='text-lg'>
                {" "}
                <span className='font-semibold'>Team : </span>
                {ProjectTeam.projectTeamName}
              </h1>
              <h1 className='text-lg '>
                <span className='font-semibold'>Project Manager : </span>
                {(
                  ProjectTeam.project?.projectManager?.firstName +
                  " " +
                  ProjectTeam.project?.projectManager?.lastName
                ).toUpperCase()}
              </h1>
            </div>
            <Table
              scroll={{ x: true }}
              loading={teamLoading}
              pagination={{
                defaultPageSize: 20,
              }}
              columns={columnsToShow}
              dataSource={ProjectTeam ? ProjectTeam.projectTeamMember : []}
            />

          </Card>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DetailProjectTeam;
