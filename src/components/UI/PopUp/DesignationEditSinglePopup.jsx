import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetDesignationsQuery } from "../../../redux/rtk/features/designation/designationApi";
import { useUpdateDesHistoryMutation } from "../../../redux/rtk/features/designationHistory/designationHistoryApi";
import BtnEditSvg from "../Button/btnEditSvg";

const DesignationEditSinglePopup = ({ data, setLoading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [updateDesHistory, { isLoading, isSuccess }] =
		useUpdateDesHistoryMutation();

	const { data: designations } = useGetDesignationsQuery({query: 'all'});
	const [initialValues, setInitialValues] = useState({
		designationId: data?.designationId || "",
		designationStartDate: data?.startDate
			? dayjs(data?.startDate.slice(0, 10))
			: "",
		designationEndDate: data?.endDate ? dayjs(data?.endDate.slice(0, 10)) : "",
		designationComment: data?.comment,
	});

	const onFinish = async (values) => {
		setLoading(true);
		const id = data.id || "";
		const infoData = {
			...values,
			designationId: Number(values.designationId),
		};

		await updateDesHistory({ id, values: infoData });

		if (isSuccess) {
			setInitialValues({});

			setIsModalOpen(false);
			setLoading(false);
			window.location.reload();
		} else {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding designation");
		setLoading(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setLoading(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setLoading(false);
	};

	return (
		<>
			<button onClick={showModal} className='mr-2'>
				<BtnEditSvg size={20} />
			</button>
			<Modal
				title={`Edit Designation ${data?.id}`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					style={{ marginBottom: "100px" }}
					eventKey='design-form'
					initialValues={initialValues}
					name='basic'
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 16,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<div>
						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Designation'
							name='designationId'
							rules={[
								{
									required: true,
									message: "Please input your Designation!",
								},
							]}>
							<Select placeholder='Select Designation'>
								{designations?.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										{item?.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Start Date'
							name='designationStartDate'
							rules={[
								{
									required: true,
									message: "Please input your start date!",
								},
							]}>
							<DatePicker name='designationStartDate' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='End Date'
							name='designationEndDate'>
							<DatePicker name='designationStartDate' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "10px" }}
							label='Comment'
							name='designationComment'>
							<Input name='designationComment' />
						</Form.Item>

						<Form.Item
							style={{ marginBottom: "20px" }}
							wrapperCol={{
								offset: 6,
								span: 12,
							}}>
							<Button
								type='primary'
								size='small'
								htmlType='submit'
								block
								loading={isLoading}>
								Update Now
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};
export default DesignationEditSinglePopup;
