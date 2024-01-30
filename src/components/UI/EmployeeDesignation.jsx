import dayjs from "dayjs";
import React from "react";
import { useDeleteDesHistoryMutation } from "../../redux/rtk/features/designationHistory/designationHistoryApi";
import BtnDeleteSvg from "./Button/btnDeleteSvg";
import DesignationTimelineSvg from "./DesignationTimelineSVG";
import DesignationEditSinglePopup from "./PopUp/DesignationEditSinglePopup";

const EmployeeDesignation = ({ list, edit, setLoading }) => {
  const [deleteDesHistory] = useDeleteDesHistoryMutation();

  const deletedDesignationHistory = async (id) => {
    setLoading(true);
    const res = await deleteDesHistory(id);

    // check if data is deleted or not and call the setPopUp function
    if (res) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  return (
    <div>
      <main className="container mx-auto w-full flex justify-center mt-5">
        <ol className="border-l-2 border-slate-600">
          {list &&
            list?.map((item, index) => {
              return (
                <li key={index}>
                  <div className="md:flex flex-start">
                    <DesignationTimelineSvg />
                    <div className="block p-6  max-w-md ml-6 mb-5 ">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium text-base mr-20 w-500 txt-color-2">
                          {item?.designation?.name}
                        </h3>

                        <h3 className="font-medium text-base mr-20 w-500 txt-color-2">
                          {dayjs(item?.startDate).format("MMM YYYY")} -{" "}
                          {item?.endDate
                            ? dayjs(item?.endDate).format("MMM YYYY")
                            : "Present"}
                        </h3>

                        {edit && (
                          <div>
                            <DesignationEditSinglePopup
                              data={item}
                              setLoading={setLoading}
                            />

                            <button
                              onClick={() => deletedDesignationHistory(item.id)}
                            >
                              <BtnDeleteSvg size={20} />
                            </button>
                          </div>
                        )}
                      </div>

                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Comment :{" "}
                        <span className="font-medium  text-sm txt-color-secondary">
                          {item?.comment}
                        </span>
                      </h3>
                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Start Date :{" "}
                        <span className="font-medium  text-sm txt-color-secondary">
                          {" "}
                          {dayjs(item?.startDate).format("DD/MM/YYYY")}
                        </span>
                      </h3>

                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        End Date :{" "}
                        <span className="font-medium  text-sm txt-color-secondary">
                          {item?.endDate
                            ? dayjs(item?.endDate).format("DD/MM/YYYY")
                            : "Present"}
                        </span>
                      </h3>
                    </div>
                  </div>
                </li>
              );
            })}
        </ol>
      </main>
    </div>
  );
};

export default EmployeeDesignation;
