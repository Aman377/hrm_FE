import { Card, Col, Row } from "antd";
import React from "react";
import checkTokenExp from "../../../utils/checkTokenExp";

import AnnouncementBar from "./AnnouncementBar";
import DemoLine from "./Demoline";
import PublicHolidayBar from "./PublicHolidayBar";
import ScrollNumber from "antd/es/badge/ScrollNumber";
import { ScrollRestoration } from "react-router-dom";

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
                <Card style={{
                 height:400,
                 overflowY: "auto",
                  marginTop: 16,
                }} title='PUBLIC HOLIDAYS' className=''>
                  <PublicHolidayBar />
                </Card>
              </Col>
              <Col sm={24} md={24} lg={12} span={24}>
                <Card style={{
                 height:400,
                 overflowY: "auto",
                  marginTop: 16,
                }} title='ANNOUNCEMENTS'>
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
