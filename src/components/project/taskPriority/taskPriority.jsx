import { useEffect, useState } from "react";
import {
  taskPriorityApi,
  useGetTaskPrioritiesQuery,
} from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriorityApi";
import getPermissions from "../../../utils/getPermissions";
import UpdateBtn from "../../Buttons/UpdateBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonDelete from "../../CommonUi/CommonDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import TablePagination from "../../CommonUi/TablePagination";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../../page-header/PageHeader";
import AddTaskPriority from "./AddtaskPriority";

const TaskStatus = () => {
  const { isLoading, data: list } = useGetTaskPrioritiesQuery();

  const [permission, setPermission] = useState([]);

  const fetchData = async () => {
    const response = await getPermissions();
    setPermission(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialColumns = [
    // {
    //   id: 1,
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      id: 2,
      title: "Name",
      key: "name",
      render: ({ name }) => name.toUpperCase(),
    },
  ];

  const columnsWithAction = [
    ...initialColumns,
    {
      id: 3,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className="flex justify-start">
          <div className="flex justify-start">
            <UserPrivateComponent permission="update-priority">
              <UpdateBtn path={`/admin/task-priority/update/${id}`} />
            </UserPrivateComponent>
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

  const hasReadSingleShiftPermission =
    permission?.includes("update-priority") ||
    permission?.includes("delete-priority");

  return (
    <div>
      <PageTitle title="Back" />

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
        {permission.length > 0 && (
          <TablePagination
            loading={isLoading}
            columns={
              hasReadSingleShiftPermission ? columnsWithAction : initialColumns
            }
            list={list}
            csvFileName={"task priorities"}
            permission={"readAll-priority"}
            searchBy={"Search by name"}
          />
        )}
      </CardCustom>
    </div>
  );
};

export default TaskStatus;
