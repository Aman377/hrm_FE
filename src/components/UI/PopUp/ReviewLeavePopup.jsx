import { Button, DatePicker, Drawer, Form, Input, Radio } from "antd";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReviewLeaveAppMutation } from "../../../redux/rtk/features/leave/leaveApi";
import getUserFromToken from "../../../utils/getUserFromToken";

const ReviewLeavePopup = ({ data }) => {
  const { id } = useParams("id");

  const [form] = Form.useForm();
  const userId = getUserFromToken();
  const [status, setStatus] = useState(null);
  const [reviewLeaveApplication, { isLoading, isSuccess }] =
    useReviewLeaveAppMutation();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      ...data,
      userId: userId,
      status: status,
      acceptLeaveFrom: dayjs(data?.leaveFrom),
      acceptLeaveTo: dayjs(data?.leaveTo),
    });
  }, [data,userId,status]);

  const onFinish = async (values) => {
    const FormData = {
      ...values,
    };

    await reviewLeaveApplication({ id: id, values: FormData });

    if (isSuccess) {
      setOpen(false);
      setStatus(null);
    }
  };
  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding department");
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setStatus(null);
  };

  return (
    <>
      <Button onClick={showDrawer} className='mt-4' type='primary'>
        Review Leave
      </Button>
      {data && (
        <Drawer
          width={720}
          title='Leave Review'
          placement='right'
          onClose={onClose}
          open={open}
        >
          <h2 rootClassName='text-2xl font-semibold mb-4 text-center mt-5'>
            Approve Leave
          </h2>
          <Form
            rootClassName='list-inside list-none border-2 border-inherit rounded px-5 py-5 m-5 mt-10'
            form={form}
            rootStyle={{ marginBottom: "40px" }}
            name='basic'
            initialValues={initialValues}
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 12,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <div>
              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Accept From'
                name='acceptLeaveFrom'
                rules={[
                  {
                    required: true,
                    message: "Please input Date !",
                  },
                ]}
              >
                <DatePicker format={"DD-MM-YYYY"} />
              </Form.Item>

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Accept To'
                name='acceptLeaveTo'
                rules={[
                  {
                    required: true,
                    message: "Please input Date!",
                  },
                ]}
              >
                <DatePicker format={"DD-MM-YYYY"} />
              </Form.Item>

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Comment'
                name='reviewComment'
              >
                <Input name='reviewComment' />
              </Form.Item>

              {status === null && (
                <p rootClassName='text-red-500 text-center mb-3'>
                  Please select status
                </p>
              )}

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                label='Select Status'
                name='status'
                rules={[
                  {
                    required: true,
                    message: "Please input Status!",
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle='solid'
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <Radio.Button value='ACCEPTED'>ACCEPTED</Radio.Button>
                  <Radio.Button value='REJECTED'>REJECTED</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                rootStyle={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 7,
                  span: 12,
                }}
              >
                <Button
                  type='primary'
                  size='middle'
                  htmlType='submit'
                  block
                  disabled={status === null}
                  loading={isLoading}
                >
                  Review Leave
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Drawer>
      )}
    </>
  );
};
export default ReviewLeavePopup;
