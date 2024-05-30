import { Button, Col, Divider, Row, Typography, Image, Table } from "antd";
import dayjs from "dayjs";
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useGetPayrollQuery } from "../../redux/rtk/features/payroll/payrollApi";
import { useGetSettingQuery } from "../../redux/rtk/features/setting/settingApi";
import PrintIconSVG from "../Icons/PrintIconSVG";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";

// eslint-disable-next-line react/display-name
const PrintToPdf = forwardRef(({ data, invoiceData, currency }, ref) => {
  console.log("data", data);
  const [basicWg, setBasicWg] = useState([]);
  const [hraData, sethraData] = useState([]);
  const [otherAllowance, setOtherAllowance] = useState([]);
  const [totalSal, setTotalSal] = useState([]);

  // call basicWage and hra
  useEffect(() => {
    if (data && invoiceData) {
      const newBasicWage = BasicWage(data);
      setBasicWg(newBasicWage);

      const hra = HRA(data)
      sethraData(hra)

      const otherAllowanceData = otherAllowances(data)
      setOtherAllowance(otherAllowanceData)

    }
  }, [data, invoiceData]);

  useEffect(() => {
    const totalSalaryData = totalSalary(data)
    setTotalSal(totalSalaryData)
  }, [data, hraData, basicWg]);

  // Calculate Basic Wage
  const BasicWage = (data) => {
    const basicPerc = invoiceData?.basicWage / 100
    const basicWageData = ((data?.salary) / dayjs(data?.salaryYear + "-" + data?.salaryMonth + "-1").daysInMonth()) * data?.workDay * (basicPerc ? basicPerc : 0.45)
    return parseFloat(basicWageData.toFixed(2))
  }

  // Calaculate HRA
  const HRA = (data) => {
    const hraPerc = invoiceData?.hra / 100
    const hra = BasicWage(data) * (hraPerc ? hraPerc : 0.40)
    return parseFloat(hra.toFixed(2))
  }

  const TotalDeduction = (invoiceData, data) => {
    return parseFloat(invoiceData?.deduction) + parseFloat(data?.deduction)
  }

  const totalSalary = (data) => {
    const basicWgValue = parseFloat(basicWg) || 0;
    const hraDataValue = parseFloat(hraData) || 0;
    const otherAllowanceValue = parseFloat(otherAllowance) || 0;
    const allowance1 = parseFloat(Allowances(1600, data)) || 0;
    const allowance2 = parseFloat(Allowances(1250, data)) || 0;
    const bonus = parseFloat(data?.bonus) || 0

    const Data = basicWgValue + hraDataValue + allowance1 + allowance2 + otherAllowanceValue + bonus;

    return parseFloat(Data.toFixed(2));
  };


  const TotalMonthSalary = (invoiceData) => {
    const total = totalSal - invoiceData
    return parseFloat(total.toFixed(2))
  }

  const Allowances = (number, data) => {
    const Data = number / dayjs(data?.salaryYear + "-" + data?.salaryMonth + "-1").daysInMonth() * data.workDay
    return parseFloat(Data.toFixed(2))
    // return number
  }

  const otherAllowances = (data) => {
    const data1 = parseFloat((data?.salary) / dayjs(data?.salaryYear + "-" + data?.salaryMonth + "-1").daysInMonth() * data?.workDay)
    const data2 = (BasicWage(data) + HRA(data) + Allowances(1600, data) + Allowances(1250, data))
    const Data = data1 - data2
    return parseFloat(Data.toFixed(2))
  }

  const { Title } = Typography;
  return (
    <Fragment>
      <div ref={ref} className="wrapper">
        <Col className="container mx-auto px-4 my-20 ">
          <Row justify="center">
            {/* <PrintIconSVG /> */}
            <Image src={invoiceData?.logo} width={150} />
          </Row>
          <Row justify="center">
            <h1 className="text-md my-2">
              {invoiceData?.address}
            </h1>
          </Row>
          <Row justify="center" className="mt-4">
            <span className="text-xl font-medium my-2">
              PAY SLIP FOR {"  "}
              {dayjs()
                .month(data.salaryMonth - 1)
                .format("MMMM")}
              , {data.salaryYear}
            </span>{" "}
          </Row>

          {/* Employee Name */}
          <Row justify="center">
            <Col span={4} className="text-md font-semibold py-1">Employee: </Col>
            <Col span={8} className="text-md font-semibold py-1">{(
              data?.user?.firstName +
              " " +
              data?.user?.lastName
            )}</Col>
            <Col span={4} className="text-md font-semibold py-1">Employee ID: </Col>
            <Col span={8} className="text-md font-semibold py-1">{data?.user?.employeeId || "demo@demo.com"}</Col>
          </Row>

          {/* Designation & DOJ */}
          <Row justify="center">
            <Col span={4} className="text-md font-semibold py-1">Designation: </Col>
            <Col span={8} className="text-md font-semibold py-1"> {data?.designationHistory?.designation?.name || "EMPLOYEE"}</Col>
            <Col span={4} className="text-md font-semibold py-1">DOJ: </Col>
            <Col span={8} className="text-md font-semibold py-1">  {
              dayjs(data?.user?.joinDate).format("DD-MMMM-YY")}</Col>
          </Row>
          {/* pan card and addhar card number */}
          <Row justify="center">
            <Col span={4} className="text-md font-semibold py-1">Addhar Card Number: </Col>
            <Col span={8} className="text-md font-semibold py-1">{data?.user.addharCard}</Col>
            <Col span={4} className="text-md font-semibold py-1">Pan Card Number: </Col>
            <Col span={8} className="text-md font-semibold py-1">{data?.user.panCard}</Col>
          </Row>
          {/* work and total day */}
          <Row justify="center">
            <Col span={4} className="text-md font-semibold py-1">Total Working Days: </Col>
            <Col span={8} className="text-md font-semibold py-1">
              {dayjs(data?.salaryYear + "-" + data?.salaryMonth + "-1").daysInMonth()}
            </Col>
            <Col span={4} className="text-md font-semibold py-1">Paid Days: </Col>
            <Col span={8} className="text-md font-semibold py-1">{data.workDay}</Col>
          </Row>

          {/* package */}
          <Row justify="center">
            <Col span={4} className="text-md font-semibold py-1">Gross Wage:   </Col>
            <Col span={8} className="text-md font-semibold py-1">{data?.salary}</Col>
            <Col span={4} className="text-md font-semibold py-1">&nbsp;</Col>
            <Col span={8} className="text-md font-semibold py-1">&nbsp;</Col>
          </Row>

          {/* Earnings and deduction */}
          <Row justify="center" className="mt-2">
            <Col span={6} className="border border-black text-md py-1 font-semibold flex justify-center">Earnings</Col>
            <Col span={6} className="border border-black text-md py-1 font-semibold flex justify-center">Amount</Col>
            <Col span={6} className="border border-black text-md py-1 font-semibold flex justify-center">Deductions</Col>
            <Col span={6} className="border border-black text-md py-1 font-semibold flex justify-center">Amount</Col>
          </Row>

          {/* basic wage */}
          <Row justify="center">
            <Col span={6} className="border border-black py-1 font-semibold pl-2">Basic Wage</Col>
            <Col span={6} className="border border-black py-1 font-semibold pl-2">{currency} {basicWg}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2">Professional Tax</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2">{currency} {invoiceData?.deduction}</Col>
          </Row>

          {/* HRA */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2">HRA</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2">{currency} {hraData}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2">Other Deduction</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">{currency} {data?.deduction}</Col>
          </Row>

          {/* Conveyance Allowances */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">Conveyance Allowances</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">{currency} {Allowances(1600, data)}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
          </Row>

          {/* Medical Allowances */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">Medical Allowances</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">{currency} {Allowances(1250, data)}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
          </Row>

          {/* Other allowances */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">Other Allowances</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">{currency} {otherAllowance}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
          </Row>

          {/* Bonus */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">Bonus</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">{currency} {data?.bonus}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
          </Row>

          {/* Empty */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">&nbsp;</Col>
          </Row>
          {/* Total */}
          <Row justify="center">
            <Col span={6} className="border border-black py-1 font-bold pl-2">Total Earnings</Col>
            <Col span={6} className="border border-black py-1 font-bold pl-2">{currency} {totalSal}</Col>
            <Col span={6} className="border border-black py-1 font-bold pl-2">Total Deductions</Col>
            <Col span={6} className="border border-black py-1 font-bold pl-2">{currency} {TotalDeduction(invoiceData, data)}</Col>
          </Row>

          {/* Net Salary */}
          <Row justify="center">
            <Col span={18} className="border border-black text-md font-bold pl-2 flex justify-center py-2">Net Salary</Col>
            <Col span={6} className="border border-black text-md font-bold pl-2 py-2">{currency} {TotalMonthSalary(TotalDeduction(invoiceData, data))}</Col>
          </Row>
          <p className=" flex m-4 justify-center">Note: This is an autogenerated payslip & does not require signature.</p>

        </Col>
      </div>
    </Fragment>
  );
});

const DetailPayslip = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { data: setting } = useGetSettingQuery();
  const [invoiceData, setInvoiceData] = useState(null);
  const [currencySign, setCurrency] = useState(null);

  useEffect(() => {
    if (setting) {
      setInvoiceData(setting);
      setCurrency(setting?.currencyData?.symbol)
    }
  }, [setting]);

  const { id } = useParams("id");
  const { data } = useGetPayrollQuery(id);

  return (
    <div>
      <UserPrivateComponent permission={"readSingle-payroll"}>
        <div className="">
          <div className="flex justify-end mr-10">
            {invoiceData && (
              <Button type="primary" size="large" onClick={handlePrint}>
                Print Payslip
              </Button>
            )}
          </div>
          {data ? (
            <PrintToPdf
              ref={componentRef}
              data={data}
              invoiceData={invoiceData}
              currency={currencySign}
            />
          ) : (
            <Loader />
          )}
        </div>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailPayslip;
