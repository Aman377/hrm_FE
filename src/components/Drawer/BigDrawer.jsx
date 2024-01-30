import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Space } from "antd";
import React, { useState } from "react";


const BigDrawer = ({ children, btnTitle, title }) => {
	const { Content } = Layout;
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	return (
    <>
      <Button
        type="primary"
        className="h-[31px] leading-[17px] ml-[-6px] mr-[5px]"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        {}
      </Button>
      <Drawer
        title={`Create a ${title}`}
        width={"40%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button
              className="h-[31px] leading-[17px] ml-[-6px] mr-[5px]"
              type="danger"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Space>
        }
      >
        <Content>{children}</Content>
      </Drawer>
    </>
  );
};
export default BigDrawer;
