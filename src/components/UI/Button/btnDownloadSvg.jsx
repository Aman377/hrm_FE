import React from "react";
import { Tooltip } from "antd";

const BtnDownlaodSvg = ({ size, onClick }) => {
  return (
    <Tooltip title="Download">
      <svg
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <path
          d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1Z"
          fill="#000000"
        />
        <path
          d="M6 17a1 1 0 1 0-2 0v.6C4 19.482 5.518 21 7.4 21h9.2c1.882 0 3.4-1.518 3.4-3.4V17a1 1 0 1 0-2 0v.6c0 .778-.622 1.4-1.4 1.4H7.4c-.778 0-1.4-.622-1.4-1.4V17Z"
          fill="#000000"
        />
      </svg>
    </Tooltip>
  );
};

export default BtnDownlaodSvg;
