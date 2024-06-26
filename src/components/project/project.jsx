import { Segmented } from "antd";
import { useState } from "react";
import KanbanBtn from "../Buttons/KanbanBtn";
import UpdateBtn from "../Buttons/UpdateBtn";

import { useGetProjectsByStatusQuery } from "../../redux/rtk/features/projectManagement/project/project/projectApi";
import MilestoneBtn from "../Buttons/MilestoneBtn";
import TaskBtn from "../Buttons/TaskBtn";
import UpdateStatusBtn from "../Buttons/UpdateStatusBtn";

import CardCustom from "../CommonUi/CardCustom";
import TablePagination from "../CommonUi/TablePagination";

import BtnAllSvg from "../UI/Button/btnAllSvg";

const Project = () => {
  const [pageConfig, setPageConfig] = useState({ value: "all", page: 1, count: 10, status: undefined });
  const { data, isLoading } = useGetProjectsByStatusQuery(pageConfig);

  const columns = [
    {
      id: 1,
      title: "Sr.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      id: 2,
      title: "Name",
      key: "name",
      render: ({ name }) => (
        <div className='font-semibold'>{name.toUpperCase()}</div>
      ),
    },
    {
      id: 3,
      title: "Project Manager",
      key: "projectManager",
      render: ({ projectManager }) =>
        (
          projectManager?.firstName +
          " " +
          projectManager?.lastName
        ).toUpperCase(),
    },

    {
      id: 5,
      title: "Kanban Board",
      dataIndex: "id",
      key: "board",
      render: (id) => (
        <div className='flex justify-start'>
          <KanbanBtn path={`/admin/kanban/${id}/`} />
          {/* <GanttChartBtn path={`/admin/gantt-chart/${id}/`} /> */}
        </div>
      ),
    },
    {
      id: 4,
      title: "Milestone",
      dataIndex: "id",
      key: "milestone",
      render: (id) => (
        <div className='flex justify-start'>
          <MilestoneBtn path={`/admin/project/${id}/milestone/`} />
        </div>
      ),
    },
    {
      id: 4,
      title: "Task Status",
      dataIndex: "id",
      key: "taskStatus",
      render: (id) => (
        <div className='flex justify-start'>
          <TaskBtn path={`/admin/project/${id}/task-status/`} />
        </div>
      ),
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className='flex justify-start'>
          <UpdateBtn path={`/admin/project/update/${id}`} />
          <UpdateStatusBtn path={`/admin/project/update/${id}/status`} />
        </div>
      ),
    },
  ];

  //make a onChange function
  const onChange = (value) => {
    setPageConfig({ status: value, page: 1, count: 10 });
  };
  const onAllClick = () => { 
    setPageConfig({ value: "all", page: 1, count: 10, status: undefined });
  };

  const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };
  const updatedData = data?.getAllProject.map((item, index) => ({
    ...item,
    serialNumber: calculateSerialNumber(pageConfig.page, pageConfig.count, index),
  }));
  return (
    <CardCustom
      title={"Project List"}
      extra={
        <>
          <div className='ml-2 mt-0.5'>
            <div className="bg-green-500 flex justify-between hover:bg-emerald-500 text-white font-bold py-1 px-3 rounded mr-2">
              <button onClick={onAllClick}>
                <BtnAllSvg size={15} title={"ALL"} />
              </button>
            </div>
          </div>
          <div>
            <Segmented
              className='text-center rounded text-red-500'
              size='middle'
              defaultValue={""}
              options={[
                {
                  label: (
                    <span>
                      <i className='bi bi-person-lines-fill'></i> PENDING
                    </span>
                  ),
                  value: "PENDING",
                },
                {
                  label: (
                    <span>
                      <i className='bi bi-person-lines-fill'></i> PROGRESS
                    </span>
                  ),
                  value: "PROGRESS",
                },
                {
                  label: (
                    <span>
                      <i className='bi bi-person-dash-fill'></i> COMPLETE
                    </span>
                  ),
                  value: "COMPLETE",
                },
                {
                  label: (
                    <span>
                      <i className='bi bi-person-dash-fill'></i> ONHOLD
                    </span>
                  ),
                  value: "ONHOLD",
                },
                {
                  label: (
                    <span>
                      <i className='bi bi-person-dash-fill'></i> DELETED
                    </span>
                  ),
                  value: "DELETED",
                },
              ]}
              value={pageConfig.value === "all" ? undefined : pageConfig.status}
              onChange={onChange}
            />
          </div>
        </>
      }
    >
      <TablePagination
        loading={isLoading}
        columns={columns}
        list={updatedData}
        total={data?.totalProject}
        setPageConfig={setPageConfig}
        pageConfig={pageConfig}
        permission={"readAll-project"}
        csvFileName={"Projects"}
        searchBy={"Search by name and project manager"}
      />
    </CardCustom>
  );
};

export default Project;
