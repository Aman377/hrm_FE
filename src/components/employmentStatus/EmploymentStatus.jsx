import { useState } from "react";
import { useGetEmploymentStatusesQuery } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";

import AddEmploymentStatus from "./AddEmploymentStatus";

const EmploymentStatus = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count:10});
  const { data, isLoading } = useGetEmploymentStatusesQuery(pageConfig);

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
      id: 3,
      title: "Color Code",
      dataIndex: "colourValue",
      key: "colourValue",
      render: (colourValue) => (
        <div className='flex'>
          <div
            className='rounded border border-gray-200'
            style={{
              marginRight: "10px",
              width: "20px",
              height: "20px",
              backgroundColor: colourValue,
            }}
          ></div>
          {colourValue}
        </div>
      ),
    },

    {
      id: 4,
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      id: 5,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/employment-status/${id}/`} />,
    },
  ];
  return (
    <div>
      <PageTitle title='Back' />

      <CardCustom
        title={"Employment Status List"}
        extra={
          <>
            <CreateDrawer
              permission={"create-employmentStatus"}
              title={"Add employment status"}
              width={30}
            >
              <AddEmploymentStatus />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          columns={columns}
          list={data?.getAllEmploymentStatus}
          total={data?.totalEmploymentStatus}
          setPageConfig={setPageConfig}
          loading={isLoading}
          csvFileName={"employment status"}
          permission={"readAll-employmentStatus"}
        />
      </CardCustom>
    </div>
  );
};

export default EmploymentStatus;
