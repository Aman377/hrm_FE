import { Button, Popover } from "antd";
import { useDeleteTaskStatusMutation } from "../../redux/rtk/features/projectManagement/project/taskStatus/taskStatusApi";
import "./styles.css";

const DeleteColumn = ({ id, projectId }) => {
  const [deleteTaskStatus] = useDeleteTaskStatusMutation();

  const onDelete = async () => {
    await deleteTaskStatus(id);
  };

  const content = (
    <div>
      <Button className='text-sm text-red-500 ml-2' onClick={onDelete}>
        Delete
      </Button>
    </div>
  );

  return (
    <Popover
      content={content}
      title='Options'
      placement='left'
      trigger={"click"}
    >
      <button
        type='primary'
        className=' px-2 mb-1 text-indigo-500 rounded hover:text-indigo-300'
      >
        <i className='bi bi-three-dots-vertical' style={{ fontSize: "19px" }}></i>
      </button>
    </Popover>
  );
};
export default DeleteColumn;
