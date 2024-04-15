import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Row,
  Typography,
  Input,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddPermissionMutation,
  useGetPermissionQuery,
} from "../../redux/rtk/features/role/roleApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function toTitleCase(str) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

function PermissionList(props) {
  const permissionNames = props.permissionNames;
  const { selectedPermission, setSelectedPermission } = props;

  const dividedGroups = [];
  for (let i = 0; i < permissionNames.length; i += 5) {
    dividedGroups.push(permissionNames.slice(i, i + 5));
  }

  const groups = dividedGroups.map((group, index) => {
    const firstName = group[0].name;
    const actualFirstName = firstName.split("-")[1];
    const checkboxes = group.map((item) => (
      <Fragment key={item.id}>
        <Checkbox
          value={item.id}
          onChange={() => {
            setSelectedPermission((prev) => ({
              ...prev,
              [item.id]: !prev[item.id],
            }));
          }}
          checked={selectedPermission[item.id]}
        >
          {item.name}
        </Checkbox>
      </Fragment>
    ));
    return (
      <div key={index}>
        <div className="w-full ml-4">
          {/* <Checkbox
            className="mr-2"
            // checked={selectAll}
            // onChange={handleSelectAllChange}
          /> */}
          {toTitleCase(capitalize(actualFirstName))}
        </div>
        <div>
          <div className="flex justify-between m-2  border-2 border-indigo-100 px-4 py-3">
            {checkboxes}
          </div>
        </div>
      </div>
    );
  });

  return <div>{groups}</div>;
}

const AddPermission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState({});
  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;
  const roleName = data.name;
  const rolePermissions = data.rolePermission;
  const { data: d } = useGetPermissionQuery();
  const [addPermission, { isLoading }] = useAddPermissionMutation();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;

    setSelectAll(isChecked);

    const updatedSelectedPermission = { ...selectedPermission };

    permissions.forEach((item) => {
      updatedSelectedPermission[item.id] = isChecked;
    });

    setSelectedPermission(updatedSelectedPermission);
  };

  useEffect(() => {
    if (d) {
      setPermissions(d);
      const permissions = d.reduce((acc, item) => {
        acc[item.id] = rolePermissions.some((i) => i.permissionId === item.id);
        return acc;
      }, {});
      setSelectedPermission(permissions);
    }
  }, [d, id, rolePermissions]);

  const permisionIds = Object.entries(selectedPermission).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onFinish = async (values) => {
    try {
      const data = {
        roleId: parseInt(id),
        permissionId: permisionIds.map(Number),
      };

      const resp = await addPermission(data);

      if (resp) {
        navigate(-1);
      }
      if (resp.message === "error") {
        toast.error("Error at giving permission, Try again");
        form.resetFields();
      }

      form.resetFields();
    } catch (error) {
      console.log(error.message);
    }
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title={"Back"} />
      <UserPrivateComponent permission={"create-rolePermission"}>
        <Row className="mt-[25px]" justify={"center"}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            className="border rounded column-design"
          >
            <Card bordered={false} className="criclebox h-full">
              <Title level={3} className="m-3 text-center mb-5">
                Add Permission :{" "}
                <span className="text-primary">{roleName}</span>
              </Title>

              {permissions.length > 0 ? (
                <>
                  <div className="flex ml-4 justify-start">
                    <Input
                      className="w-6 h-6 "
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <span className="ml-2 text-[18px] mb-4">Select All</span>
                  </div>
                  <PermissionList
                    permissionNames={permissions}
                    hasPermissions={rolePermissions}
                    setSelectedPermission={setSelectedPermission}
                    selectedPermission={selectedPermission}
                  />

                  <div className="text-center">
                    <Button
                      className="m-3 w-80 "
                      onClick={onFinish}
                      type="primary"
                      htmlType="submit"
                      size="large"
                      shape="round"
                      loading={isLoading}
                    >
                      Permit Now
                    </Button>
                  </div>
                </>
              ) : (
                <Loader />
              )}
            </Card>
          </Col>
        </Row>
      </UserPrivateComponent>
    </>
  );
};

export default AddPermission;
