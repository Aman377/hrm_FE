import { Card, Col, Row } from "antd";
import React from "react";
import checkTokenExp from "../../../utils/checkTokenExp";

import AnnouncementBar from "./AnnouncementBar";
import DemoLine from "./Demoline";
import PublicHolidayBar from "./PublicHolidayBar";
import { useState } from "react";
const Dashboard = () => {
  const [showAnnouncmentCardScrollbar, setShowAnnouncmentCardScrollbar] = useState(false);
  const [showPublicCardScrollbar, setShowPublicCardScrollbar] = useState(false);
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
                  height: 400,
                  overflowY: showPublicCardScrollbar ? 'auto' : 'hidden', 
                  marginTop: 16,
                }}
                  onMouseEnter={() => setShowPublicCardScrollbar(true)}
                  onMouseLeave={() => setShowPublicCardScrollbar(false)}
                  title='PUBLIC HOLIDAYS' className=''>
                  <PublicHolidayBar />
                </Card>
              </Col>
              <Col sm={24} md={24} lg={12} span={24}>
                <Card style={{
                  height: 400,
                  overflowY: showAnnouncmentCardScrollbar ? 'auto' : 'hidden', // Show scrollbar conditionally
                  marginTop: 16,
                }}
                  onMouseEnter={() => setShowAnnouncmentCardScrollbar(true)}
                  onMouseLeave={() => setShowAnnouncmentCardScrollbar(false)}
                  title='ANNOUNCEMENTS'>
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
