import { useParams } from "react-router-dom";
import {
    departmentApi,
    useGetDepartmentQuery,
} from "../../redux/rtk/features/Department/departmentApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import TableNoPagination from "../CommonUi/TableNoPagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import DepartmentEditPopup from "../UI/PopUp/DepartmentEditPopup";
import PageTitle from "../page-header/PageHeader";

const DetailDepartment = () => {
  const { id } = useParams();

  const { data: department, isLoading } = useGetDepartmentQuery(id);
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
      key: "firstName",
      render: ({ firstName, lastName }) => firstName + " " + lastName,
    },

    {
      id: 6,
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },

    {
      id: 5,
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => role?.name,
    },

    {
      id: 6,
      title: "Designation",
      dataIndex: "designationHistory",
      key: "designationHistory",
      render: (designationHistory) =>
        designationHistory[0]?.designation?.name || "N/A",
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
      <PageTitle title=' Back  ' />
      <UserPrivateComponent permission={"readSingle-department"}>
        <CardCustom
          title={
            <h3>
              ID : {department?.id} | {department?.name}
            </h3>
          }
          extra={
            <>
              <DepartmentEditPopup data={department && department} />
              <CommonDelete
                permission={"delete-department"}
                deleteThunk={departmentApi.endpoints.deleteDepartment.initiate}
                id={id}
                navigatePath={"/admin/department"}
              />
            </>
          }
        >
          <TableNoPagination
            leftElement={
              <h1 className='p-2 font-semibold text-lg text-center'>
                User List
              </h1>
            }
            list={department?.user}
            loading={isLoading}
            columns={columns}
            permission={"readSingle-department"}
            csvFileName={"user of department"}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailDepartment;
