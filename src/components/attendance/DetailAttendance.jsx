import { Card } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useGetAttendanceQuery } from "../../redux/rtk/features/attendance/attendanceApi";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

const DetailAttendance = () => {
  const { id } = useParams("id");
  const { data: attendance } = useGetAttendanceQuery(id);

  return (
    <div>
      <PageTitle title="Back" />
      <Card className="mt-4">
        <div className="text-center mb-4">
          {" "}
          <h2 className="text-2xl font-semibold text-gray-600">
            Attendance Status #{attendance?.id}{" "}
          </h2>
        </div>
        {attendance ? (
          <div className="flex justify-center ">
            <ul className="list-inside list-none border-2 border-inherit rounded px-5 py-5 ">
              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                Name :{" "}
                <p className="ml-2 text-sm text-gray-900">
                  {(
                    attendance?.user.firstName +
                    " " +
                    attendance?.user.lastName
                  ).toUpperCase()}{" "}
                </p>
              </li>

              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                IP Address :{" "}
                <p className="ml-2 text-sm text-gray-900">{attendance?.ip} </p>
              </li>
              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                In Time :{" "}
                <p className="ml-2 text-sm text-gray-900">
                  {dayjs(attendance.inTime).format("DD-MM-YYYY, h:mm A")}
                </p>
              </li>
              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                Out Time :{" "}
                <p className="ml-2 text-sm text-gray-900">
                  {dayjs(attendance.outTime).format("DD-MM-YYYY, h:mm A")}
                </p>
              </li>
              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                In Time Status :{" "}
                <p className="ml-2 text-sm text-gray-900">
                  {attendance.inTimeStatus === "Late" ? (
                    <span className="text-red-500">
                      {attendance.inTimeStatus.toUpperCase()}
                    </span>
                  ) : attendance.inTimeStatus === "Early" ? (
                    <span className="text-yellow-500">
                      {attendance.inTimeStatus.toUpperCase()}
                    </span>
                  ) : (
                    <span className="text-green-500">
                      {attendance.inTimeStatus.toUpperCase()}
                    </span>
                  )}
                </p>
              </li>
              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                Out Time Status :{" "}
                <p className="ml-2 text-sm text-gray-900">
                  {attendance.outTimeStatus === "Late" ? (
                    <span className="text-red-500">
                      {attendance.outTimeStatus.toUpperCase()}
                    </span>
                  ) : attendance.outTimeStatus === "Early" ? (
                    <span className="text-yellow-500">
                      {attendance.outTimeStatus.toUpperCase()}
                    </span>
                  ) : (
                    <span className="text-green-500">
                      {attendance.outTimeStatus.toUpperCase()}
                    </span>
                  )}
                </p>
              </li>
              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                Punch By :{" "}
                <p className="text-green-500 ml-2 text-sm ">
                  {attendance.punchBy || "ON REVIEW"}
                </p>
              </li>

              <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                Comment :{" "}
                <p className="ml-2 text-sm text-gray-900">
                  {attendance.comment || "No comment"}
                </p>
              </li>
            </ul>
          </div>
        ) : (
          <Loader />
        )}
      </Card>
    </div>
  );

  // "reviewComment": null,
  // "attachment": null,
};

export default DetailAttendance;
