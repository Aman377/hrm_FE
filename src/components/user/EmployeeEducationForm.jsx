import { MinusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Space, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";


const EmployeeEducationForm = ({ key, restField, remove, name, form }) => {

  const [fileName, setFileName] = useState();
  const [fileList, setFileList] = useState([]);

  const onChange = (event) => {
    const value = event.target.value;

    // this will return C:\fakepath\somefile.ext
    console.log(value);

    const files = event.target.files[0];

    //this will return an ARRAY of File object
    setFileList(files);
  }
  // console.log(form.getFieldsValue('document'))



  return (
    <div>
      <Space
        key={key}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
        align='baseline'
      >
        <Form.Item
          {...restField}
          name={[name, "degree"]}
          // rules={[
          //   {
          //     required: true,
          //     message: "Missing  degree",
          //   },
          // ]}
        >
          <Input placeholder='Degree' />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "institution"]}
          // rules={[
          //   {
          //     required: true,
          //     message: "Missing institution",
          //   },
          // ]}
        >
          <Input placeholder='Institution' />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "result"]}
          // rules={[{ required: true, message: "Missing result" }]}
        >
          <Input placeholder='Result' />
        </Form.Item>

        <Form.Item
          {...restField}
          name={[name, "studyStartDate"]}
          // rules={[{ required: true, message: "Missing studyStartDate" }]}
        >
          <DatePicker placeholder='studyStartDate' />
        </Form.Item>

        <Form.Item
          {...restField}
          name={[name, "studyEndDate"]}
        >
          <DatePicker placeholder='studyEndDate' />
        </Form.Item>

        <Form.Item
          {...restField}
          name={[name, "fieldOfStudy"]}
          // rules={[{ required: true, message: "Missing fieldOfStudy" }]}
        >
          <Input placeholder='Field Of Study; Computer' />
        </Form.Item>

        {/* <Form.Item
          {...restField}
          name={[name, "document"]}
          rules={[{ required: true, message: "Missing document" }]} */}
        {/* // valuePropName='fileList' */}
        {/* > */}
          {/* <Upload
            onChange={(info) => {
              if (info.fileList.length > 0) {
                // debugger
                // Get the first file object from the fileList
                const fileObject = info.file;
                // fileList.push(fileObject)
                // Set the value of the 'document' field in the form
                form.setFieldsValue({
                  [`${name}.document`]: "",
                });
              } else {
                // Clear the value of the 'document' field if no file is selected
                form.setFieldsValue({
                  [`${name}.document`]: null,
                });
              }
            }} maxFileSize={1024 * 1024 * 2} // 2MB
            listType="picture-card"
            beforeUpload={() => false}
            name="image"
            // fileList={fileList}
            maxCount={1}
          >
            {fileList.length === 0 && <Button icon={<UploadOutlined />}>Upload</Button>}
          </Upload> */}
          {/* <input type="file" accept="image/png" onChange={onChange} /> */}
        {/* </Form.Item> */}

        <MinusCircleOutlined
          className='txt-color'
          style={{ fontSize: "150%" }}
          onClick={() => remove(name)}
        />
      </Space>
    </div>
  );
};

export default EmployeeEducationForm;
