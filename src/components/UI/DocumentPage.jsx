import React, { useState } from "react";
import { Button, Form, Input, Row, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useUpdateDocumentMutation,
  useGetUserQuery,
} from "../../redux/rtk/features/user/userApi";
import { useNavigate, useParams } from "react-router-dom";
import BtnEditSvg from "./Button/btnEditSvg";
import BtnDownlaodSvg from "./Button/btnDownloadSvg";
import { toastHandler } from "../../utils/functions";

const DocumentPage = ({ list }) => {
  const { id } = useParams();
  const imagePath = "https://hros.excitesystems.com/public/";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileType, setFileType] = useState("");

  const showModal = (documentType) => {
    // setEditingDocument(documentType);
    const documentUrl = list[0][documentType];
    if (documentUrl != null) {
      setFileList([
        {
          uid: "-1",
          name: "document",
          status: "done",
          url: imagePath + documentUrl,
        },
      ]);
    } else {
      setFileList([]);
    }

    setIsModalOpen(true);
    setFileType(documentType);
  };

  const handleOk = () => {
    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);
    console.log("fileType: ", fileType);
    console.log("id: ", id);
    console.log("formData: ", formData);
    // updateDocument({ id, fileType, values: formData });
    const token = localStorage.getItem("access-token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = fetch(
      `${import.meta.env.VITE_APP_API}/user/document/${id}/${fileType}`,
      {
        method: "POST",
        headers: headers,
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          toastHandler("File updated successfully", "success");
        }
        // setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toastHandler("File not updated", "warning");
        // setIsModalOpen(false);
      });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDownload = (file) => {
    const fullPath = `${imagePath}${file}`;
    if (file == null) {
      toastHandler("No file exists", "warning");
    } else {
      window.open(fullPath, "_blank");
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className="w-full ">
      {list &&
        list.map((item, index) => {
          return (
            <div className="md:flex flex-start ">
              <Modal
                title="Document Edit"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Upload
                  listType="picture-card"
                  className="w-full"
                  beforeUpload={() => false}
                  name="image"
                  maxCount={1}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {/* {documentImages.document ? (
                    <div className="flex justify-between w-full ">
                      <div className="w-12/12">
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload Document</div>
                      </div>
                      <div className="w-2/12 absolute left-60">
                        <img
                          src={imagePath + documentImages.document}
                          alt="Document"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  ) : ( */}
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload Document</div>
                  </div>
                  {/* )} */}
                </Upload>
              </Modal>
              <div className="block  mb-5  w-full ">
                {/* Document */}
                <div className="flex justify-between  mb-4">
                  <h3 className="font-medium text-base mr-40  txt-color-2">
                    Document
                  </h3>
                  <div className="flex space-x-3">
                    <button onClick={() => showModal("document")}>
                      <BtnEditSvg size={26} />
                    </button>
                    <BtnDownlaodSvg
                      onClick={() => handleDownload(item.document)}
                      size={26}
                    />
                  </div>
                </div>
                {/* CV */}
                <div className="flex justify-between mb-4">
                  <h3 className="font-medium text-base mr-40  txt-color-2">
                    CV
                  </h3>
                  <div className="flex space-x-3">
                    <button onClick={() => showModal("cv")}>
                      <BtnEditSvg size={26} />
                    </button>
                    <BtnDownlaodSvg
                      size={26}
                      onClick={() => handleDownload(item.cv)}
                    />
                  </div>
                </div>

                {/* Address Proof */}
                <div className="flex justify-between mb-4">
                  <h3 className="font-medium text-base mr-40  txt-color-2">
                    Address Proof
                  </h3>
                  <div className="flex space-x-3">
                    <button onClick={() => showModal("addressProof")}>
                      <BtnEditSvg size={26} />
                    </button>
                    <BtnDownlaodSvg
                      size={26}
                      onClick={() => handleDownload(item.addressProof)}
                    />
                  </div>
                </div>

                {/* Aadhar Card */}
                <div className="flex justify-between mb-4">
                  <h3 className="font-medium text-base mr-40  txt-color-2">
                    Aadhar Card
                  </h3>
                  <div className="flex space-x-3">
                    <button onClick={() => showModal("aadharCard")}>
                      <BtnEditSvg size={26} />
                    </button>
                    <BtnDownlaodSvg
                      size={26}
                      onClick={() => handleDownload(item.aadharCard)}
                    />
                  </div>
                </div>

                {/* Pan Card */}
                <div className="flex justify-between mb-4">
                  <h3 className="font-medium text-base mr-40  txt-color-2">
                    Pan Card
                  </h3>
                  <div className="flex space-x-3">
                    <button onClick={() => showModal("panCard")}>
                      <BtnEditSvg size={26} />
                    </button>
                    <BtnDownlaodSvg
                      size={26}
                      onClick={() => handleDownload(item.panCard)}
                    />
                  </div>
                </div>

                {/* Experience Letter */}
                <div className="flex justify-between mb-4">
                  <h3 className="font-medium text-base mr-40  txt-color-2">
                    Experience Letter
                  </h3>
                  <div className="flex space-x-3">
                    <button onClick={() => showModal("experienceLetter")}>
                      <BtnEditSvg size={26} />
                    </button>
                    <BtnDownlaodSvg
                      size={26}
                      onClick={() => handleDownload(item.experienceLetter)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DocumentPage;
