import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Select, Space, Layout } from "antd";


const AddProductDrawer = ({ children, btnTitle, title }) => {
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
      <Button type="primary" className="h-[34px] leading-[33px] mx-[5px]" onClick={showDrawer}>
        <span style={{ textAlign: "center" }}>+</span>
      </Button>
      <Drawer
        title={`Create a ${title}`}
        width={"50%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button className="h-[31px] leading-[17px] ml-[-6px] mr-[5px]" type="danger" onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }>
        <Content>{children}</Content>
      </Drawer>
    </>
  );
};
export default AddProductDrawer;
