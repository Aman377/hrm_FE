import dayjs from "dayjs";
import React from "react";
import TimeLineSvg from "./TimeLineSvg";

import BtnDeleteSvg from "./Button/btnDeleteSvg";

import { useDeleteEducationMutation } from "../../redux/rtk/features/education/educationApis";
import EducaitonEditSinglePopup from "./PopUp/EducaitonEditSinglePopup";

const EmployeeTimeline = ({ list, edit, setLoading }) => {
  const [deleteEducation, { isSuccess }] = useDeleteEducationMutation();

  const deletedEducation = async (id) => {
    setLoading(true);
    await deleteEducation(id);

    // check if data is deleted or not and call the setPopUp function
    if (isSuccess) {
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
            list?.map((item) => {
              return (
                <li key={item.id}>
                  <div className="md:flex flex-start">
                    <TimeLineSvg />
                    <div className="block p-6  max-w-md ml-6 mb-5 ">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium text-base mr-20 w-500 txt-color-2">
                          {item?.degree || "No Degree"}
                        </h3>

                        <h3 className="font-medium text-base mr-20 w-500 txt-color-2">
                          {dayjs(item?.studyStartDate).format("MMM YYYY")} -{" "}
                          {item?.studyEndDate
                            ? dayjs(item?.studyEndDate).format("MMM YYYY")
                            : "Present"}
                        </h3>
                        {edit && (
                          <div>
                            <EducaitonEditSinglePopup
                              data={item}
                              setLoading={setLoading}
                            />
                            <button onClick={() => deletedEducation(item.id)}>
                              {" "}
                              <BtnDeleteSvg size={20} />
                            </button>
                          </div>
                        )}
                      </div>

                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Field of Study :{" "}
                        <span className="font-medium text-sm txt-color-secondary">
                          {item?.fieldOfStudy}
                        </span>
                      </h3>

                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Institute :{" "}
                        <span className="font-medium text-sm txt-color-secondary">
                          {item?.institution}
                        </span>
                      </h3>

                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Result :{" "}
                        <span className="font-medium text-sm txt-color-secondary">
                          {item?.result}
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

export default EmployeeTimeline;
