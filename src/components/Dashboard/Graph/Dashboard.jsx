import { Card, Col, Row } from "antd";
import React from "react";
import checkTokenExp from "../../../utils/checkTokenExp";

import AnnouncementBar from "./AnnouncementBar";
import DemoLine from "./Demoline";
import PublicHolidayBar from "./PublicHolidayBar";

const Dashboard = () => {
  const accessToken = localStorage.getItem("access-token");
  checkTokenExp(accessToken);
  return (
    <>
      <div>
        <div>
          <div className='mb-3'>
            <Row>
              <Col span={24}>
                <DemoLine />
              </Col>
            </Row>
          </div>
          <div>
            <Row gutter={[30, 30]}>
              <Col sm={24} md={24} lg={12} span={24} className='mb-auto'>
                <Card title='PUBLIC HOLIDAYS' className=''>
                  <PublicHolidayBar />
                </Card>
              </Col>
              <Col sm={24} md={24} lg={12} span={24}>
                <Card title='ANNOUNCEMENTS'>
                  <AnnouncementBar />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
