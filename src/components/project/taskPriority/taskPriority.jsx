import {
  taskPriorityApi,
  useGetTaskPrioritiesQuery,
} from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriorityApi";
import UpdateBtn from "../../Buttons/UpdateBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonDelete from "../../CommonUi/CommonDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddTaskPriority from "./AddtaskPriority";

const TaskStatus = () => {
  const { isLoading, data: list } = useGetTaskPrioritiesQuery();

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
      id: 3,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className='flex justify-start'>
          <div className='flex justify-start'>
            <UpdateBtn path={`/admin/task-priority/update/${id}`} />
            <CommonDelete
              permission={"delete-priority"}
              id={id}
              deleteThunk={
                taskPriorityApi.endpoints.deleteTaskPriority.initiate
              }
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title='Back' />

      <CardCustom
        title={"Task Priority Column List"}
        extra={
          <>
            <CreateDrawer
              title={"Create Task Priority"}
              permission={"create-priority"}
              width={30}
            >
              <AddTaskPriority list={list} loading={isLoading} />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          loading={isLoading}
          columns={columns}
          list={list}
          csvFileName={"task priorities"}
          permission={"readAll-priority"}
        />
      </CardCustom>
    </div>
  );
};

export default TaskStatus;
