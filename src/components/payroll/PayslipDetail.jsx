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
  const { Title } = Typography;
  return (
    <Fragment>
      <div ref={ref} className="wrapper">
        <Col className="container mx-auto px-4 my-20 ">
          <Row justify="center border border-black">
            {/* <PrintIconSVG /> */}
            <Image src={invoiceData?.logo} width={100} />
          </Row>
          <Row justify="center border border-black">
            <h1 className="text-2xl mt-2 mb-2">
              {invoiceData?.address}
            </h1>
          </Row>
          <Row justify="center border border-black">
            <span className="text-xl">
              PAY SLIP FOR {"  "}
              {dayjs()
                .month(data.salaryMonth - 1)
                .format("MMMM")}
              , {data.salaryYear}
            </span>{" "}
          </Row>
          {/* Blank */}
          <Row justify="center">
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
          </Row>
          {/* Employee Name */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Name of the Employee </Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">{(
              data?.user?.firstName +
              " " +
              data?.user?.lastName
            )}</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
          </Row>
          {/* Employee ID */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Name ID </Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">  {data?.user?.employeeId || "demo@demo.com"}</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
          </Row>
          {/* Designation */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Designation </Col>
            <Col span={18} className="border border-black text-lg font-semibold pl-2"> {data?.designationHistory?.designation?.name || "EMPLOYEE"}</Col>
          </Row>
          {/* Date of joining */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">DOJ </Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">  {
              dayjs(data?.user?.joinDate).format("DD-MMMM-YY")}</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
          </Row>
          {/* package */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Gross Wage  </Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">{data?.salary * 12}</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
          </Row>
          {/* work and total day */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Total Working Days </Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">
              {dayjs(data?.salaryMonth).daysInMonth()}
            </Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Paid Days</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">{data.workDay}</Col>
          </Row>
          {/* LOP and leave taken */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">LOP days</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Leaves Taken</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
          </Row>
          {/* pan card and addhar card number */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Addhar Card Number</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Pan Card Number</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
          </Row>
          {/* Blank */}
          <Row justify="center">
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
          </Row>
          {/* Earnings and deduction */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Earnings</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Deductions</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">&nbsp;</Col>
          </Row>
          {/* basic wage */}
          {/* Earnings and deduction */}
          <Row justify="center">
            <Col span={6} className="border border-black text-lg font-semibold pl-2">Basic Wage</Col>
            <Col span={6} className="border border-black text-lg font-semibold pl-2">{(data?.salary * 12) / (data?.workDay)}</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
            <Col span={6} className="border border-black">&nbsp;</Col>
          </Row>
          <Row>
            {/* show Avatar with url */}
            <Col span={9}>

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
              </div>
            </Col>

            <Col span={6}>
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
            </Col>
          </Row>

          <Row style={{ marginTop: "5%" }} gutter={[100, 0]}>

            {/* Earnings */}
            <Col span={12}>
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
            </Col>
          </Row>

          <div style={{ marginTop: "5%" }} className="flex justify-end text-right">
            <div>
              <Title level={4}>
                Total Earnings : {currency} {data.salaryPayable + data.bonus}{" "}
              </Title>
              <Title level={4}>Total Deduction : {currency} {data.deduction} </Title>
              <Title level={3}>
                Total Payable Salary : {currency} {data.totalPayable}{" "}
              </Title>
            </div>
          </div>
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
