import { Button, Col, Input, Modal, Row } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  useAddAttendanceMutation,
  useGetCurrentUserClockInStatusQuery,
} from "../../../redux/rtk/features/attendance/attendanceApi";
import getUserFromToken from "../../../utils/getUserFromToken";
// publicIp
import publicIp from "react-public-ip";

const AttendancePopup = () => {
  const isLogged = localStorage.getItem("isLogged");

  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [ipv4, setIpv4] = useState();
  const [checkInNote, setCheckInNote] = useState("");
  const [inOut, setInOut] = useState("In");
  const id = getUserFromToken();
  const [inTime, setInTime] = useState();

  const { data: clockIn, isLoading: loading } =
    useGetCurrentUserClockInStatusQuery(id);
  const [addClockIn] = useAddAttendanceMutation();

  useEffect(() => {
    if (clockIn) {
      if (clockIn.outTime === null) {
        setInOut("Out");
        const inTime = clockIn.inTime;
        const dateParts = inTime.split(/[\s-:]/);
        const date = new Date(
          Date.UTC(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2],
            dateParts[3],
            dateParts[4],
            dateParts[5]
          )
        );

        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - date.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60)) % 60;
        const hoursDifference =
          Math.floor(timeDifference / (1000 * 60 * 60)) % 24;

        setInTime(`${hoursDifference}:${minutesDifference}`);
      } else {
        setInOut("In");
      }
    }
  }, [clockIn]);

  const clockInClick = async () => {
    setLoader(true);
    // get the current public ip address
    const ipv4 = (await publicIp.v4()) || "";
    setIpv4(ipv4);
    setLoader(false);
    setIsModalVisible(true);
    setTime(dayjs(new Date()).format("hh:mm A"));
    setDate(dayjs(new Date()).format("DD-MM-YYYY"));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCheckInNote("");
  };

  const handleOk = async () => {
    // make json object
    const data = {
      // convert string to int
      userId: parseInt(id),
      comment: checkInNote,
      ip: ipv4,
    };

    // make a post request with redux/rtk
    try {
      const resp = await addClockIn({ values: data });
      if (resp.outTime === null) {
        setInOut("Out");
      } else {
        setInOut("In");
      }
      setCheckInNote("");
    } catch (error) {
      console.log(error);
    }
    // close the modal
    setIsModalVisible(false);
  };

  return (
    <>
      {/* button for Clock IN */}
      {isLogged &&
        (inOut === "In" ? (
          <Button
            loading={loading || loader}
            type='primary'
            className='btn-clock-in'
            onClick={() => clockInClick()}
          >
            <span className='btn-clock-in-text'>Clock In</span>
          </Button>
        ) : (
          <Button
            loading={loading || loader}
            type='danger'
            className='btn-clock-in'
            onClick={() => clockInClick()}
          >
            <span className='btn-clock-in-text'>Clock Out {inTime}</span>
          </Button>
        ))}
      <Modal
        title={`Clock ${inOut}`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <p className='text-base font-semibold text-color-2'>{`Clock ${inOut} date & time:`}</p>
            {/* show current time */}
            <h1>Today {date}</h1>
            {/* show current date */}
            <h1>Time {time}</h1>
          </Col>
          <Col
            span={24}
            className='font-semibold '
            style={{
              "background-color": "#AFFF9C",
              padding: "2%",
              marginTop: "5%",
            }}
          >
            <p className='font-semibold'>
              Your IP: <span style={{ color: "#595959" }}>{ipv4}</span>
            </p>
          </Col>
          {/* show a text area */}
          <Col
            span={24}
            style={{
              marginTop: "2%",
            }}
          >
            <p>{`Clock ${inOut} Note:`}</p>
            <TextArea
              onChange={(e) => setCheckInNote(e.target.value)}
              maxLength={28}
              rows={4}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default AttendancePopup;
