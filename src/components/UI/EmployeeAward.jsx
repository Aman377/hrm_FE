import dayjs from "dayjs";
import React from "react";
import { useDeleteAwardHistoryMutation } from "../../redux/rtk/features/awardHistory/awardHistoryApi";
import AwardTimelineSvg from "./AwardTimelineSVG";
import BtnDeleteSvg from "./Button/btnDeleteSvg";
import AwardEditSinglePopup from "./PopUp/AwardEditSinglePopup";

const EmployeeAward = ({ list, edit, setLoading }) => {
  const [deleteAwardHistory] = useDeleteAwardHistoryMutation();

  const deletedAwardHistory = async (id) => {
    setLoading(true);
    const resp = await deleteAwardHistory(id);

    // check if data is deleted or not and call the setPopUp function
    if (resp) {
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
                    <AwardTimelineSvg />
                    <div className="block p-6  max-w-md ml-6 mb-5 ">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium text-base mr-20 w-500 txt-color-2">
                          Award : {item?.award?.name}
                        </h3>

                        <h3 className="font-medium text-base mr-20 w-500 txt-color-2">
                          {dayjs(item?.awardedDate).format("MMM YYYY")}
                        </h3>

                        {edit && (
                          <div>
                            <AwardEditSinglePopup
                              data={item}
                              setLoading={setLoading}
                            />

                            <button
                              onClick={() => deletedAwardHistory(item.id)}
                            >
                              <BtnDeleteSvg size={20} />
                            </button>
                          </div>
                        )}
                      </div>

                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Description :{" "}
                        <span className="font-medium  text-sm txt-color-secondary">
                          {item?.description || "No description"}
                        </span>
                      </h3>
                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Comment :{" "}
                        <span className="font-medium  text-sm txt-color-secondary">
                          {item?.comment}
                        </span>
                      </h3>
                      <h3 className="font-medium text-sm mr-20 w-500 txt-color-2">
                        Awarded Date :
                        <span className="font-medium  text-sm txt-color-secondary">
                          {" "}
                          {dayjs(item?.awardedDate).format("DD/MM/YYYY")}
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

export default EmployeeAward;
