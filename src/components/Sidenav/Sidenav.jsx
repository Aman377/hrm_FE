import {
  CalendarOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FlagFilled,
  FlagOutlined,
  HomeOutlined,
  NotificationFilled,
  PieChartFilled,
  RocketOutlined,
  SettingOutlined,
  FundProjectionScreenOutlined,
  SubnodeOutlined,
  TrophyFilled,
  UnorderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";
import getUserFromToken from "../../utils/getUserFromToken";

const Sidenav = ({ color, sideNavOpenKeys }) => {
  const user = getUserFromToken();
  const permissions = getPermissions();
  const hasPermission = (item) => {
    return permissions?.includes(item ? item : "");
  };
  // console.log("haspermission", hasPermission("create-user"));
  const menu = [
    {
      label: (
        <NavLink to="/admin/dashboard">
          <span>Dashboard</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },

    (hasPermission("create-user") ||
      hasPermission("readAll-user") ||
      hasPermission("readAll-role") ||
      hasPermission("readAll-designation") ||
      hasPermission("readAll-department")) && {
      label: "HR",
      key: "hr",
      icon: <UserOutlined />,
      children: [
        hasPermission("create-user") && {
          label: (
            <NavLink to="/admin/hr/staffs/new">
              <span>New Employee</span>
            </NavLink>
          ),

          key: "staffs",
          icon: <UsergroupAddOutlined />,
        },
        hasPermission("readAll-user") && {
          label: (
            <NavLink to="/admin/hr/staffs">
              <span>Employee List</span>
            </NavLink>
          ),
          key: "users",
          icon: <UsergroupAddOutlined />,
        },
        hasPermission("readAll-role") && {
          label: (
            <NavLink to="/admin/role/">
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        hasPermission("readAll-designation") && {
          label: (
            <NavLink to="/admin/designation/">
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
          icon: <UserSwitchOutlined />,
        },
        hasPermission("readAll-department") && {
          label: (
            <NavLink to="/admin/department">
              <span>Department</span>
            </NavLink>
          ),
          key: "department",
          icon: <UserSwitchOutlined />,
        },
      ],
    },

    (hasPermission("create-attendance") ||
      hasPermission("readAll-attendance")) && {
      label: "ATTENDANCE",
      key: "ATTENDANCE",
      icon: <ClockCircleOutlined />,
      children: [
        hasPermission("create-attendance") && {
          label: (
            <NavLink to="/admin/attendance">
              <span>Attendance</span>
            </NavLink>
          ),
          key: "attendance",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readSingle-attendance") && {
          label: (
            <NavLink to={`/admin/attendance/user/${user}`}>
              <span>My Attendance</span>
            </NavLink>
          ),
          key: "myAttendance",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission("create-payroll") || hasPermission("readAll-payroll")) && {
      label: "PAYROLL",
      key: "payroll",
      icon: <WalletOutlined />,
      children: [
        hasPermission("create-payroll") && {
          label: (
            <NavLink to="/admin/payroll/new">
              <span>Calculate Payroll</span>
            </NavLink>
          ),
          key: "calculatePayroll",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readAll-payroll") && {
          label: (
            <NavLink to="/admin/payroll/list">
              <span>Payslip List</span>
            </NavLink>
          ),
          key: "payslipList",
          icon: <FileOutlined />,
        },
      ],
    },

    hasPermission("readAll-shift") && {
      label: "SHIFT",
      key: "shift",
      icon: <ClockCircleOutlined />,
      children: [
        hasPermission("readAll-shift") && {
          label: (
            <NavLink to="/admin/shift">
              <span>Shift</span>
            </NavLink>
          ),
          key: "newShift",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    hasPermission("readAll-employmentStatus") && {
      label: "EMPLOYMENT",
      key: "EMPLOYMENT",
      icon: <RocketOutlined />,
      children: [
        hasPermission("readAll-employmentStatus") && {
          label: (
            <NavLink to="/admin/employment-status">
              <span>Status</span>
            </NavLink>
          ),
          key: "employmentStatus",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission("create-leaveApplication") ||
      hasPermission("readAll-leaveApplication") ||
      hasPermission("readSingle-leaveApplication")) && {
      label: "LEAVE ",
      key: "leave",
      icon: <UsergroupDeleteOutlined />,
      children: [
        hasPermission("create-leaveApplication") && {
          label: (
            <NavLink to="/admin/leave/new">
              <span> New Leave </span>
            </NavLink>
          ),
          key: "newLeave",
          icon: <SubnodeOutlined />,
        },
        hasPermission("readAll-leaveApplication") && {
          label: (
            <NavLink to="/admin/leave">
              <span>Leave Status</span>
            </NavLink>
          ),
          key: "leaveStatus",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readSingle-leaveApplication") && {
          label: (
            <NavLink to={`/admin/leave/user/${user}`}>
              <span>My Leaves</span>
            </NavLink>
          ),
          key: "myLeaves",
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission("readAll-weeklyHoliday") ||
      hasPermission("readAll-publicHoliday")) && {
      label: "HOLIDAY",
      key: "holiday",
      icon: <CalendarOutlined />,
      children: [
        hasPermission("readAll-weeklyHoliday") && {
          label: (
            <NavLink to="/admin/holiday/week">
              <span>Weekly Holiday</span>
            </NavLink>
          ),
          key: "weeklyHoliday",
          icon: <PieChartFilled />,
        },
        hasPermission("readAll-publicHoliday") && {
          label: (
            <NavLink to="/admin/holiday/public">
              <span>Public Holiday</span>
            </NavLink>
          ),
          key: "publicHoliday",
          icon: <PieChartFilled />,
        },
      ],
    },

    hasPermission("readAll-leavePolicy") && {
      label: "LEAVE POLICY",
      key: "LEAVE POLICY",
      icon: <CalendarOutlined />,
      children: [
        hasPermission("readAll-leavePolicy") && {
          label: (
            <NavLink to="/admin/leave-policy">
              <span>Leave Policy</span>
            </NavLink>
          ),
          key: "leavePolicy",
          icon: <PieChartFilled />,
        },
      ],
    },

    hasPermission("readAll-announcement") && {
      label: "ANNOUNCEMENT",
      key: "ANNOUNCEMENT",
      icon: <NotificationFilled />,
      children: [
        hasPermission("readAll-announcement") && {
          label: (
            <NavLink to="/admin/announcement">
              <span>Announcement</span>
            </NavLink>
          ),
          key: "announcement",
          icon: <FlagFilled />,
        },
      ],
    },

    (hasPermission("readAll-account") ||
      hasPermission("readAll-transaction") ||
      hasPermission("create-transaction")) && {
      label: "ACCOUNTS",
      key: "accounts",
      icon: <WalletOutlined />,
      children: [
        hasPermission("readAll-account") && {
          label: (
            <NavLink to="/admin/account/">
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },

        (hasPermission("readAll-transaction") ||
          hasPermission("create-transaction")) && {
          label: (
            <NavLink to="/admin/transaction/">
              <span>Transaction</span>
            </NavLink>
          ),
          key: "transaction",
          icon: <UnorderedListOutlined />,
        },
      ],
    },

    hasPermission("readAll-account") && {
      label: "FINANCE REPORT",
      key: "report",
      icon: <FlagOutlined />,
      children: [
        hasPermission("readAll-account") && {
          label: (
            <NavLink to="/admin/account/trial-balance">
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        hasPermission("readAll-account") && {
          label: (
            <NavLink to="/admin/account/balance-sheet">
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        hasPermission("readAll-account") && {
          label: (
            <NavLink to="/admin/account/income">
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },

    (hasPermission("crate-award") || hasPermission("readAll-award")) && {
      label: (
        <NavLink to="/admin/award">
          <span>AWARDS</span>
        </NavLink>
      ),
      key: "award",
      icon: <TrophyFilled />,
    },

    (hasPermission("create-project") ||
      hasPermission("readAll-project") ||
      hasPermission("create-projectTeam") ||
      hasPermission("create-milestone") ||
      hasPermission("readAll-priority") ||
      hasPermission("create-task-Status")) && {
      label: "PROJECT",
      key: "PROJECT",
      icon: <FundProjectionScreenOutlined />,
      children: [
        hasPermission("create-project") && {
          label: (
            <NavLink to="/admin/project/new">
              <span>Add Project</span>
            </NavLink>
          ),
          key: "project",
          icon: <FundProjectionScreenOutlined />,
        },
        hasPermission("readAll-project") && {
          label: (
            <NavLink to="/admin/project">
              <span>All Project</span>
            </NavLink>
          ),
          key: "allProject",
          icon: <FundProjectionScreenOutlined />,
        },
        hasPermission("create-projectTeam") && {
          label: (
            <NavLink to="/admin/team">
              <span>Team</span>
            </NavLink>
          ),
          key: "team",
          icon:<FundProjectionScreenOutlined />,
        },
        (hasPermission("create-priority") ||
          hasPermission("readAll-priority")) && {
          label: (
            <NavLink to="/admin/task-priority">
              <span>Task Priority</span>
            </NavLink>
          ),
          key: "taskPriority",
          icon: <FundProjectionScreenOutlined />,
        },
        hasPermission("create-milestone") && {
          label: (
            <NavLink to="/admin/milestone">
              <span>Add Milestone</span>
            </NavLink>
          ),
          key: "milestone",
          icon: <FundProjectionScreenOutlined />,
        },

        hasPermission("create-taskStatus") && {
          label: (
            <NavLink to="/admin/task-status">
              <span>Add Task Status</span>
            </NavLink>
          ),
          key: "taskStatus",
          icon: <FundProjectionScreenOutlined />,
        },
      ],
    },

    hasPermission("readAll-setting") && {
      label: "SETTINGS",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        hasPermission("readAll-emailConfig") && {
          label: (
            <NavLink to="/admin/email-config">
              <span>Email Config</span>
            </NavLink>
          ),
          key: "emailConfig",
          icon: <SettingOutlined />,
        },
        hasPermission("readAll-setting") && {
          label: (
            <NavLink to="/admin/company-setting">
              <span>Company Settings</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  return (
    <div>
      <Menu
        theme='dark'
        mode='inline'
        items={menu}
        className='sidenav-menu '
        // openKeys={[sideNavOpenKeys]}
        // style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default Sidenav;
