import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  taskStatusApi,
  useGetAllTaskStatusByProjectIdQuery,
} from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatusApi";
import UpdateBtn from "../../Buttons/UpdateBtn";
import CommonDelete from "../../CommonUi/CommonDelete";
import PageTitle from "../../page-header/PageHeader";
import AddTaskStatus from "./AddtaskStatus";

const TaskStatus = ({ isFixed }) => {
  const { id } = useParams("id");
  const { isLoading, data: list } = useGetAllTaskStatusByProjectIdQuery(id);
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
      key: "name",
      render: ({ name }) => name.toUpperCase(),
    },
    {
      id: 4,
      title: "Project",
      key: "project",
      render: ({ project }) => project?.name?.toUpperCase(),
    },
    {
      id: 3,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className='flex justify-start'>
          <UpdateBtn path={`/admin/task-status/update/${id}`} />
          <CommonDelete
            permission={"delete-taskStatus"}
            deleteThunk={taskStatusApi.endpoints.deleteTaskStatus.initiate}
            id={id}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title='Back' />
      <AddTaskStatus list={list} loading={isLoading} isFixed={isFixed} />

      {isFixed && (
        <Card className='mb-4'>
          <h1 className='text-xl mb-4'>
            {" "}
            Task Column List :{" "}
            <span className='font-semibold'>
              {list ? list[0]?.project?.name : "No Task"}
            </span>{" "}
          </h1>
          <Table
            scroll={{ x: true }}
            loading={isLoading}
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

export default TaskStatus;
