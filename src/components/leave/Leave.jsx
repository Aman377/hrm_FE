import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddLeave from "./AddLeave";

const Leave = (props) => {
	
	return (
		<div>
			<PageTitle title='Back' />
			<AddLeave />
		</div>
	);
};

export default Leave;
