import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { useGetRoleQuery } from "../../redux/rtk/features/role/roleApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import CustomTable from "./CustomTable";

//PopUp

const DetailRole = () => {
  const { id } = useParams();

  const { data: role } = useGetRoleQuery(id);

  return (
    <div>
      <PageTitle title=" Back  " />

      <UserPrivateComponent permission={"readSingle-role"}>
        <div className="mt-[25px]">
          {role ? (
            <Fragment key={role.id}>
              <Card bordered={false}>
                <div className="flex justify-between mb-5">
                  <h5>
                    <i className="bi bi-person-lines-fill"></i>
                    <span className="mr-left">
                      ID : {role.id} | {role.name}
                    </span>
                  </h5>
                  <div className="text-end">
                    <UserPrivateComponent permission={"update-role"}>
                      <Link
                        className="m-2"
                        to={`/admin/role/permit/${role.id}`}
                        state={{ data: role }}
                      >
                        <Button
                          type="primary"
                          shape="round"
                          icon={<EditOutlined />}
                        >
                          {" "}
                          New Permission{" "}
                        </Button>
                      </Link>
                    </UserPrivateComponent>
                  </div>
                </div>
                <CustomTable role={role?.rolePermission} />
              </Card>
            </Fragment>
          ) : (
            <Loader />
          )}
        </div>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailRole;
