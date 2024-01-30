import { Card } from "antd";
import dayjs from "dayjs";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import BtnLoader from "../loader/BtnLoader";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import {
  PublicHolidayApi,
  useGetPublicHolidayQuery,
} from "../../redux/rtk/features/publicHoliday/publicHolidayApi";
import CommonDelete from "../CommonUi/CommonDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PublicHolidayEdit from "../UI/PopUp/PublicHolidayEditPopup";

const DetailPublicHoliday = () => {
  const { id } = useParams();

  const { data: publicHoliday, isLoading } = useGetPublicHolidayQuery(id);

  return (
    <div>
      <PageTitle title=" Back  " />
      <UserPrivateComponent permission={"readSingle-publicHoliday"}>
        <Card className="mr-top mt-5">
          {publicHoliday ? (
            <Fragment key={publicHoliday.id}>
              <div>
                <div className="flex justify-between ">
                  <h3 className={"text-xl"}>
                    ID : {publicHoliday.id} | {publicHoliday.name}
                  </h3>
                </div>
                <div className="flex justify-center mt-5 mb-4 ">
                  <Card
                    style={{ width: 500 }}
                    title="Details of Public Holiday"
                    extra={
                      <div className="flex justify-end items-center">
                        <PublicHolidayEdit data={publicHoliday} />
                        {!isLoading ? (
                          <CommonDelete
                            permission={"delete-publicHoliday"}
                            deleteThunk={
                              PublicHolidayApi.endpoints.deletePublicHoliday
                                .initiate
                            }
                            id={id}
                            navigatePath={-1}
                          />
                        ) : (
                          <BtnLoader />
                        )}
                      </div>
                    }
                  >
                    <div className="flex justify-center">
                      <ul className="list-inside list-none ">
                        <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                          Name :{" "}
                          <p className="ml-2 text-sm text-gray-900">
                            {(publicHoliday?.name).toUpperCase()}{" "}
                          </p>
                        </li>
                        <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                          Date :{" "}
                          <p className="ml-2 text-sm text-gray-900">
                            {dayjs(publicHoliday?.date).format("DD/MM/YYYY")}
                          </p>
                        </li>

                        <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                          Created At :{" "}
                          <p className="ml-2 text-sm text-gray-900">
                            {dayjs(publicHoliday?.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </li>

                        <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                          Updated At :{" "}
                          <p className="ml-2 text-sm text-gray-900">
                            {dayjs(publicHoliday?.updatedAt).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </div>
            </Fragment>
          ) : (
            <Loader />
          )}
        </Card>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailPublicHoliday;
