import { Modal } from "antd";
import { useState } from "react";
import { useGetDesignationsQuery } from "../../../redux/rtk/features/designation/designationApi";
import Loader from "../../loader/loader";
import BtnEditSvg from "../Button/btnEditSvg";
import EmployeeDesignation from "../EmployeeDesignation";
import DesignationAddSinglePopup from "./DesignationAddSinglePopup";

const DesignationEditPopup = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: list } = useGetDesignationsQuery({query: 'all'});

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={showModal} className='mt-4 mr-2'>
        <BtnEditSvg size={25} />
      </button>
      <Modal
        title='Edit Designation'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!loading ? (
          <>
            <EmployeeDesignation
              list={data}
              edit={true}
              setLoading={setLoading}
            />
            <DesignationAddSinglePopup list={list} setLoading={setLoading} />
          </>
        ) : (
          <Loader />
        )}
      </Modal>
    </>
  );
};
export default DesignationEditPopup;
