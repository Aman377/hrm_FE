
import { Link, useParams } from "react-router-dom";
import {
  designationApi,
  useGetDesignationQuery,
} from "../../redux/rtk/features/designation/designationApi";
import CommonDelete from "../CommonUi/CommonDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import BtnEditSvg from "../UI/Button/btnEditSvg";
import PageTitle from "../page-header/PageHeader";
import CardCustom from "../CommonUi/CardCustom";
import TableNoPagination from "../CommonUi/TableNoPagination";
import ViewBtn from "../Buttons/ViewBtn";
//PopUp

const DetailDesignation = () => {
  const { id } = useParams();

  const { data: designation, isLoading: loading } = useGetDesignationQuery(id);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/hr/staffs/${id}`}>{id}</Link>,
    },
    {
      title: "Employee Name",
      key: "employee",
      render: ({ firstName, lastName, id }) => (
        <Link to={`/admin/hr/staffs/${id}`}>{firstName + " " + lastName}</Link>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-user"}>
          <ViewBtn path={`/admin/hr/staffs/${id}`} />
        </UserPrivateComponent>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title=" Back " subtitle=" " />

      <div className="mt-[10px]">
        <UserPrivateComponent permission={"readSingle-designation"}>
          <CardCustom
            title={
              <h3>
                ID : {designation?.designationId} |{" "}
                {designation?.designationName}
              </h3>
            }
            extra={
              <div className=" flex justify-end items-center text-end w-50">
                <UserPrivateComponent permission={"update-designation"}>
                  <Link
                    className="mr-3"
                    to={`/admin/designation/${designation?.designationId}/update`}
                    state={{ data: designation }}
                  >
                    <BtnEditSvg size={36} />
                  </Link>
                </UserPrivateComponent>

                <CommonDelete
                  navigatePath={"/admin/designation"}
                  permission={"delete-designation"}
                  deleteThunk={
                    designationApi.endpoints.deleteDesignation.initiate
                  }
                  id={id}
                />
              </div>
            }
          >
            <TableNoPagination
              leftElement={
                <h1 className="p-2 font-semibold text-lg text-center">
                  Staffs Information{" "}
                </h1>
              }
              list={designation?.employee}
              loading={loading}
              columns={columns}
              csvFileName={"Staff Information"}
              permission={"readSingle-designation"}
            />
          </CardCustom>
        </UserPrivateComponent>
      </div>
    </div>
  );
};

export default DetailDesignation;
