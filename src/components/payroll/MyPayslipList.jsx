import { EyeFilled } from "@ant-design/icons";
import { Button, DatePicker, Radio, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllPayrollByIdQuery } from "../../redux/rtk/features/payroll/payrollApi";
import CardCustom from "../CommonUi/CardCustom";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import getPermissions from "../../utils/getPermissions";

const MyPayslipList = () => {
    const [pageConfig, setPageConfig] = useState({ page: 1, count: 10 });
    const userId = localStorage.getItem("id")
    const [permission, setPermission] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState()
    const [updatedData, setUpdatedData] = useState("");
    const { data: payroll, isLoading } =
        useGetAllPayrollByIdQuery(userId);
    const onMonthChange = (date, dateString) => {
        setSelectedMonth(dateString)
    };
    // const onYearChange = (date, dateString) => {
    //     setPageConfig((prev) => {
    //         return { ...prev, value: "monthWise", salaryYear: dateString };
    //     });
    // };

    const calculateSerialNumber = (currentPage, itemsPerPage, index) => {
        return (currentPage - 1) * itemsPerPage + index + 1;
    };
    const updatedDataFunc = () => {
        const updatedDt = payroll?.map((item, index) => ({
            ...item,
            id: item.userId,
            actuallId: item.id,
            serialNumber: calculateSerialNumber(
                pageConfig.page,
                pageConfig.count,
                index
            ),
        }));
        setUpdatedData(updatedDt)
    }

    const filterDataFunc = () => {
        if (selectedMonth) {
            const updatedDt = payroll?.map((item, index) => ({
                ...item,
                id: item.userId,
                actuallId: item.id,
                serialNumber: calculateSerialNumber(
                    pageConfig.page,
                    pageConfig.count,
                    index
                ),
            })).filter((item) => item.salaryMonth == selectedMonth);
            setUpdatedData(updatedDt)
        } else {
            const updatedDt = payroll?.map((item, index) => ({
                ...item,
                id: item.userId,
                actuallId: item.id,
                serialNumber: calculateSerialNumber(
                    pageConfig.page,
                    pageConfig.count,
                    index
                ),
            }));
            setUpdatedData(updatedDt)
        }
    }

    const fetchData = async () => {
        const response = await getPermissions();
        setPermission(response);
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        updatedDataFunc()
    }, [payroll])

    useEffect(() => {
        filterDataFunc()
    }, [selectedMonth])


    const initialColumns = [
        {
            id: 1,
            title: "Sr.No",
            dataIndex: "serialNumber",
            key: "serialNumber",
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "user",
            render: (user) => `${user?.firstName} ${user?.lastName}`,
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
        },
        {
            title: "Salary Payable",
            dataIndex: "salaryPayable",
            key: "salaryPayable",
        },
        {
            title: "Month ",
            key: "month",
            render: ({ salaryMonth }) => `${salaryMonth}`,
        },
        {
            title: "Year",
            key: "year",
            render: ({ salaryYear }) => `${salaryYear}`,
        },
        {
            title: "bonus",
            dataIndex: "bonus",
            key: "bonus",
        },
        {
            title: "bonusComment",
            dataIndex: "bonusComment",
            key: "bonusComment",
        },
        {
            title: "deduction",
            dataIndex: "deduction",
            key: "deduction",
        },
        {
            title: "deductionComment",
            dataIndex: "deductionComment",
            key: "deductionComment",
        },
        {
            title: "Total",
            dataIndex: "totalPayable",
            key: "totalPayable",
        },
        {
            title: "W Hours",
            dataIndex: "workingHour",
            key: "workingHour",
            render: (workingHour) => `${workingHour?.toFixed(2)} hours`,
        },
        {
            title: "Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
        },
    ];

    const columnsWithAction = [
        ...initialColumns,

        {
            title: "Action",
            key: "action",
            render: (data) => {

                return (
                    <div className="flex flex-col gap-1">
                        <Link to={`/admin/payroll/${data?.actuallId}`}>
                            <Tooltip title="View">
                                <Button
                                    icon={<EyeFilled />}
                                    type="primary"
                                    size="middle"
                                    className="mr-2"
                                ></Button>
                            </Tooltip>
                        </Link>

                    </div>
                );
            },
        },
    ];

    const hasReadSingleShiftPermission =
        permission?.includes("readSingle-payroll");

    return (
        <div>
            <PageTitle title="Back" />

            <CardCustom
                title={"My Payslip List"}
                extra={
                    <div className="flex items-center">
                        <h1 className="text-base text-color-2 items-center mr-2 mt-1 w-[140px]">
                            {" "}
                            Select Month :{" "}
                        </h1>
                        <DatePicker
                            format={"M"}
                            className=" mr-5"
                            style={{ maxWidth: "200px" }}
                            picker="month"
                            onChange={onMonthChange}
                        />
                        {/* <h1 className="text-base text-color-2 items-center mr-2 mt-1 w-[140px]">
                            {" "}
                            Select Year :{" "}
                        </h1>
                        <DatePicker
                            format={"YYYY"}
                            picker="year"
                            style={{ maxWidth: "200px" }}
                            onChange={onYearChange}
                        /> */}
                        {/* <Radio.Group
                            className="ml-4 w-[250px]"
                            options={options}
                            onChange={onChange4}
                            value={pageConfig?.paymentStatus || "ALL"}
                            optionType="button"
                            buttonStyle="solid"
                        /> */}
                    </div>
                }
            >
                {permission.length > 0 && (
                    <TablePagination
                        list={updatedData}
                        total={payroll?.totalPayslip}
                        setPageConfig={setPageConfig}
                        pageConfig={pageConfig}
                        loading={isLoading}
                        columns={
                            hasReadSingleShiftPermission ? columnsWithAction : initialColumns
                        }
                        permission={"readSingle-payroll"}
                        csvFileName={"Payslip List"}
                        searchBy={"Search by name"}
                    />
                )}
            </CardCustom>
        </div>
    );
};

export default MyPayslipList;
