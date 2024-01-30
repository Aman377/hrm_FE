import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ViewBtn = ({ path }) => {
  return (
    <div>
      <Tooltip title='View'>
        <Link to={path}>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mr-2 px-2 py-1`}
          >
            <i className='bi bi-eye-fill'></i>
          </button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default ViewBtn;
