import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

export default function CreateDrawer({
  title,
  width,
  permission,
  children,
  update,
  color,
  header
}) {
  // Drawer state
  const [open, setOpen] = useState(false);

  const onClose = () => {
    // console.log("close");
    setOpen(false);
  };

  return (
    <>
      <UserPrivateComponent permission={permission}>
        <div
          onClick={() => setOpen(true)}
        >
          <div className="flex items-start justify-start ">
            <div className="min-w-[110px]">{title}</div>
          </div>
        </div>
        <Drawer
          width={
            window.innerWidth <= 768 ? "100%" : width ? `${width}%` : "45%"
          }
          title={`${header}`}
          placement="right"
          onClose={onClose}
          open={open}
        >
          <div className="px-5 pt-5"> {children}</div>
        </Drawer>
      </UserPrivateComponent>
    </>
  );
}
