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

  const BasicWage = (data) => {
    const basicPerc = invoiceData?.basicWage / 100
    const basicWageData = Math.floor(((data?.salary * 12) / dayjs(data?.salaryMonth).daysInMonth()) * data?.workDay * (basicPerc ? basicPerc : 0.45))
    return basicWageData
  }
  const HRA = (data) => {
    const hraPerc = invoiceData?.hra / 100
    const hra = Math.floor(BasicWage(data) * (hraPerc ? hraPerc : 0.40))
    return hra
  }

  const TotalDeduction = (invoiceData) => {
    return invoiceData?.deduction ? invoiceData?.deduction : 0 + invoiceData?.otherDeduction ? invoiceData?.otherDeduction : 0
  }

  const TotalMonthSalary = (data, invoiceData) => {
    const total = data?.salary - invoiceData
    return total
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
          <Row justify="center">
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
              {dayjs(data?.salaryMonth).daysInMonth()}
            </Col>
            <Col span={4} className="text-md font-semibold py-1">Paid Days: </Col>
            <Col span={8} className="text-md font-semibold py-1">{data.workDay}</Col>
          </Row>
          {/* LOP and leave taken */}
          <Row justify="center">
            <Col span={4} className="text-md font-semibold py-1">LOP days: </Col>
            <Col span={8} className="text-md font-semibold py-1">&nbsp;</Col>
            <Col span={4} className="text-md font-semibold py-1">Leaves Taken: </Col>
            <Col span={8} className="text-md font-semibold py-1">&nbsp;</Col>
          </Row>
          {/* package */}
          <Row justify="center">
            <Col span={4} className="text-md font-semibold py-1">Gross Wage:   </Col>
            <Col span={8} className="text-md font-semibold py-1">{data?.salary * 12}</Col>
            <Col span={4} className="text-md font-semibold py-1">&nbsp;</Col>
            <Col span={8} className="text-md font-semibold py-1">&nbsp;</Col>
          </Row>

          {/* Blank */}
          {/* <Row justify="center">
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
          </Row> */}
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
            <Col span={6} className="border border-black py-1 font-semibold pl-2">{currency} {BasicWage(data) ? BasicWage(data) : 'NA'}</Col>
            <Col span={6} className="border border-black py-1">&nbsp;</Col>
            <Col span={6} className="border border-black py-1">&nbsp;</Col>
          </Row>

          {/* HRA */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2">HRA</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2">{currency} {HRA(data) ? HRA(data) : 'NA'}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2">Professional Tax</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2">{currency} {invoiceData?.deduction}</Col>
          </Row>
          {/* Other */}
          <Row justify="center">
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">Other Allowances</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">{currency} {invoiceData?.otherEarning ? invoiceData?.otherEarning : 'NA'}</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">Other Deduction</Col>
            <Col span={6} className="border border-black font-semibold py-1 pl-2 ">{currency} {data?.deduction ? data?.deduction : 'NA'}</Col>
          </Row>

          {/* Total */}
          <Row justify="center">
            <Col span={6} className="border border-black py-1 font-semibold pl-2">Total Earnings</Col>
            <Col span={6} className="border border-black py-1 font-semibold pl-2">{currency} {data?.salary ? data?.salary : 'NA'}</Col>
            <Col span={6} className="border border-black py-1 font-semibold pl-2">Total Deductions</Col>
            <Col span={6} className="border border-black py-1 font-semibold pl-2">{currency} {TotalDeduction(invoiceData) ? TotalDeduction(invoiceData) : 'NA'}</Col>
          </Row>

          {/* Net Salary */}
          <Row justify="center">
            <Col span={18} className="border border-black text-md font-bold pl-2 flex justify-center py-2">Net Salary</Col>
            <Col span={6} className="border border-black text-md font-bold pl-2 py-2">{currency} {TotalMonthSalary(data, TotalDeduction(invoiceData))}</Col>
          </Row>
          <p className=" flex m-4 justify-center">Note: This is an autogenerated payslip & does not require signature.</p>
          {/* <Row>
            {/* show Avatar with url */}
          {/* <Col span={9}>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700">
                  {invoiceData?.companyName.toUpperCase()}
                </span>
                <div className="text-sm text-slate-700">
                  {invoiceData?.email || "demo@demo.com"}
                </div>

                <div className="text-sm  text-slate-700">
                  {invoiceData?.phone}
                </div>
                {/* <div className="mt-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Employee Name:
                  </span>{" "}
                  <span className="text-sm font-semibold text-slate-700">
                    {(
                      data?.user?.firstName +
                      " " +
                      data?.user?.lastName
                    ).toUpperCase()}
                  </span>
                  <div className="text-sm text-slate-700">
                    <span className="text-sm font-semibold text-slate-700">
                      Employee ID:
                    </span>{" "}
                    {data?.user?.employeeId || "demo@demo.com"}
                  </div>
                  <div className="text-sm text-slate-700">
                    <span className="text-sm font-semibold text-slate-700">
                      Designation:
                    </span>{" "}
                    {data?.designationHistory?.designation?.name || "EMPLOYEE"}
                  </div>
                  <div className="text-sm text-slate-700">
                    <span className="text-sm font-semibold text-slate-700">
                      DOJ:
                    </span>{" "}
                    {formatDate(data?.user?.joinDate) || "EMPLOYEE"}
                  </div>
                </div> */}
          {/* </div>
            </Col> 

            {/* <Col span={6}>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                  Salary:
                </span>{" "}
                {currency} {data.salary}
              </p>
              <span className="text-sm font-semibold text-slate-700">
                Work Day:{" "}
              </span>{" "}
              {data.workDay}
              <p>
                <span className="text-sm font-semibold text-slate-700">
                  Working Hour:{" "}
                </span>{" "}
                {data.workingHour} Hours
              </p>
            </Col>
            <Col span={6}>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                  Payslip for:
                </span>{" "}
                {dayjs()
                  .month(data.salaryMonth - 1)
                  .format("MMMM")}
                , {data.salaryYear}
              </p>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                  Created at:
                </span>{" "}
                {dayjs(data.createdAt).format("DD/MM/YYYY")}
              </p>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                  Status:
                </span>{" "}
                {data.paymentStatus}
              </p>
            </Col> */}
          {/* </Row> */}

          {/* <Row style={{ marginTop: "5%" }} gutter={[100, 0]}>

            {/* Earnings */}
          {/* <Col span={12}>
              <h2 className="text-xl font-semibold text-slate-600 mb-4">
                Earnings
              </h2>
              <Row>
                <Col span={12}>
                  <Title level={5}>Salary Payable</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>{currency} {data.salaryPayable}</Title>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Title level={5}>Bonus : {data.bonusComment}</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>{currency} {data.bonus}</Title>
                </Col>
              </Row>

              <Divider></Divider>
              <Row>
                <Col span={12}>
                  <Title level={4}>Total Earnings</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>{currency} {data.salaryPayable + data.bonus}</Title>
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <h2 className="text-xl font-semibold text-slate-600 mb-4">
                Deductions
              </h2>

              <Row>
                <Col span={12}>
                  <Title level={5}>Deduction : {data.deductionComment}</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>{currency} {data.deduction}</Title>
                </Col>
              </Row>

              <Divider style={{ marginTop: "40px" }}></Divider>
              <Row>
                <Col span={12}>
                  <Title level={4}>Total Deduction</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>{currency} {data.deduction}</Title>
                </Col>
              </Row>
            </Col> */}
          {/* </Row> */}

          {/* <div style={{ marginTop: "5%" }} className="flex justify-end text-right">
            <div>
              <Title level={4}>
                Total Earnings : {currency} {data.salaryPayable + data.bonus}{" "}
              </Title>
              <Title level={4}>Total Deduction : {currency} {data.deduction} </Title>
              <Title level={3}>
                Total Payable Salary : {currency} {data.totalPayable}{" "}
              </Title>
            </div>
          </div> */}
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
