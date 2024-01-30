import { Line } from "@ant-design/plots";
import { Card, Col, DatePicker, Row } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { Fragment, useState } from "react";
import { useGetDashboardsQuery } from "../../../redux/rtk/features/dashboard/dashboardApi";
import AttendancePopup from "../../UI/PopUp/AttendancePopup";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import Loader from "../../loader/loader";

dayjs.extend(utc);

const DemoLine = () => {
  const [pageConfig, setPageConfig] = useState({
    startdate: dayjs(new Date()).startOf("month").format("YYYY-MM-DD"),
    enddate: dayjs(new Date()).endOf("month").format("YYYY-MM-DD"),
  });
  const { data: state } = useGetDashboardsQuery(pageConfig);
  const data = state?.workHoursByDate;

  const { RangePicker } = DatePicker;

  const onCalendarChange = (dates) => {
    const startdate = (dates?.[0]).format("YYYY-MM-DD");
    const enddate = (dates?.[1]).format("YYYY-MM-DD");

    setPageConfig((prev) => {
      return { ...prev, startdate, enddate };
    });
  };

  const config = {
    data,
    xField: "date",
    yField: "time",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v) => `${v / 1000} Hours`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <Fragment>
      <UserPrivateComponent permission={"readAll-dashboard"}>
        <Row gutter={[30, 30]} justify={"space-between"}>
          <Col sm={24} md={24} lg={12} span={24} className='mb-auto'>
            <RangePicker
              onCalendarChange={onCalendarChange}
              defaultValue={[dayjs().startOf("month"), dayjs().endOf("month")]}
              className='range-picker'
              style={{ maxWidth: "25rem" }}
            />
          </Col>
          <Col sm={24} md={24} lg={12} span={24}>
            <div className='text-end mr-4'>
              <AttendancePopup />
            </div>
          </Col>
        </Row>

        <NewDashboardCard information={state} />

        <Card title='WORK HOURS '>
          {data ? <Line {...config} /> : <Loader />}
        </Card>
      </UserPrivateComponent>
    </Fragment>
  );
};

export default DemoLine;
