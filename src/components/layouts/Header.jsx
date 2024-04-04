import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Col, Menu, Row } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ViewDrawler from "../CommonUi/ViewDrawler";
import DetailStaff from "../../components/user/detailsStaff";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ onPress, collapsed, handleCollapsed }) {
  useEffect(() => window.scrollTo(0, 0));

  const isLogged = localStorage.getItem("isLogged");
  const user = localStorage.getItem("user");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const id = localStorage.getItem("id");
  console.log(id);
  const items = [
    {
      key: "1",
      label: (
        <p className="flex items-center p-0.5">
          <UserOutlined style={{ fontSize: "16px" }} />{" "}
          <span className="logout-text font-weight-bold me-2 ms-1">
            {/* <ViewDrawler
              permission={"readSingle-user"}
              title={firstName + " " + lastName}
              width={100}
              header={"Profile"}  
            > */}
            {firstName} {lastName}
            {/* <DetailStaff ids={id} />
            </ViewDrawler> */}
          </span>
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/admin/auth/logout" className="flex items-center p-0.5">
          <LogoutOutlined className="text-danger" />
          <span className="logout-text font-weight-bold me-2 ms-1">
            Log Out
          </span>
        </Link>
      ),
    },
  ];

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    if (isDarkMode) document.body.className = "dark-theme dark";
    if (!isDarkMode) document.body.className = "light-theme light";
  }, [isDarkMode]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={4}>
          <div className="hidden md:block ">
            {isLogged &&
              React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: `p-0 text-[18px] leading-[64px] cursor-pointer transition-color duration-300`,
                  onClick: () => handleCollapsed(!collapsed),
                }
              )}
          </div>
        </Col>
        <Col span={24} md={20} className="flex items-center justify-end">
          {/* <DarkModeSwitch
            style={{ margin: "1rem" }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          /> */}
          {/* {isLogged && (
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
              className="me-3 flex align-items-center"
            >
              <UserOutlined style={{ fontSize: "16px" }} />{" "}
              <span className="logout-text font-weight-bold me-2 ms-1">
                {user}
              </span>
            </Typography.Title>
          )} */}

          {!isLogged && (
            <Link to="/admin/auth/login" className="btn-sign-in text-dark">
              <span></span>
            </Link>
          )}

          {isLogged && (
            <>
              {/* UserName */}
              <ViewDrawler
                permission={"readSingle-user"}
                title={firstName + " " + lastName}
                width={100}
                header={"Profile"}
              >
                <DetailStaff ids={id} />
              </ViewDrawler>
              
              <Button
                type="link"
                className="block md:hidden"
                onClick={() => onPress()}
                style={{ boxShadow: "none" }}
              >
                {toggler}
              </Button>
            </>
          )}
          {isLogged && (
            <div>
              <Button className="user-btn group relative">
                <UserOutlined style={{ fontSize: "16px" }} className="mb-2" />
                <Menu
                  className="absolute hidden group-hover:block rounded right-0  z-10"
                  items={items}
                />
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Header;
