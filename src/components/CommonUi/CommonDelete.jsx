import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

export default function CommonDelete({
	permission,
	deleteThunk,
	id,
	navigatePath,
	className,
	spin,
	getThunk,
	userId
}) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onDelete = async (id) => {
		var result = window.confirm("Are you sure you want to delete?");
		if (result) {
			setLoading(true);
			const res = await dispatch(deleteThunk(id));
			if (res.data && !res.error) {
				navigatePath && navigate(navigatePath);
				if (getThunk) {
					const data = await dispatch(getThunk(userId));
					//   console.log(data);
				}
			}
			setLoading(false);
		}
	};


	return (
		<>
			<UserPrivateComponent permission={permission}>
				<Tooltip title='Delete'>
					<span
						onClick={() => onDelete(id)}
						className={`bg-red-600 h-8 w-8 flex justify-center items-center cursor-pointer ${className ? className : "p-2"
							} text-white rounded-md`}>
						<DeleteOutlined className={spin && loading ? "animate-spin" : ""} />
					</span>
				</Tooltip>
			</UserPrivateComponent>
		</>
	);
}
