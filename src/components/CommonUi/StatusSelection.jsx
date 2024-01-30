import { SolutionOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useState } from "react";

export default function StatusSelection({ setPageConfig }) {
  const [status, setStatus] = useState("true");
  const onChange = (value) => {
    setStatus(value);
    setPageConfig((prev) => {
      return { ...prev, status: value };
    });
  };
  return (
    <Segmented
      className='text-center rounded text-red-500 '
      size='middle'
      options={[
        {
          label: (
            <span>
              <SolutionOutlined /> Active
            </span>
          ),
          value: "true",
        },
        {
          label: (
            <span>
              <UserDeleteOutlined /> Inactive
            </span>
          ),
          value: "false",
        },
      ]}
      value={status}
      onChange={onChange}
    />
  );
}
