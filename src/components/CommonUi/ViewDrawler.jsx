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
  header,
}) {
  // Drawer state
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <UserPrivateComponent permission={permission}>
        <div onClick={() => setOpen(true)}>
          {role == 1 ? (
            ""
          ) : (
            <div className="flex items-end justify-end ">
              <div className="min-w-[110px] text-blue-400 hover:underline cursor-pointer flex justify-center">
                {title}
              </div>
            </div>
          )}
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
