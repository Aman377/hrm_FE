import { Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  milestoneApi,
  useGetMilestoneByProjectIdQuery,
} from "../../../redux/rtk/features/projectManagement/project/milestone/milestoneApi";
import UpdateBtn from "../../Buttons/UpdateBtn";
import CommonDelete from "../../CommonUi/CommonDelete";
import PageTitle from "../../page-header/PageHeader";
import AddMilestone from "./AddMilestone";

const Milestone = ({ isFixed }) => {
  const { id } = useParams("id");

  const { isLoading: loading, data: list } =
    useGetMilestoneByProjectIdQuery(id);
  const [columnsToShow, setColumnsToShow] = useState([]);

  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      id: 4,
      title: "Start Date",
      key: "startDate",
      render: ({ startDate }) => dayjs(startDate).format("DD/MM/YYYY"),
    },
    {
      id: 5,
      title: "End Date",
      key: "endDate",
      render: ({ endDate }) => dayjs(endDate).format("DD/MM/YYYY"),
    },
    {
      id: 5,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className='flex justify-start'>
          <UpdateBtn path={`/admin/milestone/update/${id}`} />
          <CommonDelete
            permission={"delete-milestone"}
            deleteThunk={milestoneApi.endpoints.deleteMilestone.initiate}
            id={id}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title='Back' />
      <AddMilestone isFixed={isFixed} />
      {isFixed && (
        <Card>
          <h1 className='text-xl mb-5'> Milestones in Project </h1>
          <Table
            scroll={{ x: true }}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
            }}
            columns={columnsToShow}
            dataSource={list}
          />
        </Card>
      )}
    </div>
  );
};

export default Milestone;
