import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { Button, Popconfirm } from 'antd';

export default function CommonDelete({
	permission,
	deleteThunk,
	id,
	navigatePath,
	className,
	spin,
	onDeleted
}) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onDelete = async (id) => {
		setLoading(true);
		const res = await dispatch(deleteThunk(id));
		if (res.data && !res.error) {
			navigatePath && navigate(navigatePath);
		}
		onDeleted();
		setLoading(false);
	};


	return (
		<>
			<UserPrivateComponent permission={permission}>
				<Tooltip title='Delete'>
					<Popconfirm
						placement="topLeft"
						title="Are you sure you want to delete?"
						onConfirm={() => onDelete(id)}
						okText="Yes"
						cancelText="No"
					>
						<span
							// onClick={() => onDelete(id)}
							className={`bg-red-600 h-8 w-8 flex justify-center items-center cursor-pointer ${className ? className : "p-2"
								} text-white rounded-md`}>
							<DeleteOutlined className={spin && loading ? "animate-spin" : ""} />
						</span>
					</Popconfirm>
				</Tooltip>
			</UserPrivateComponent>
		</>
	);
}
