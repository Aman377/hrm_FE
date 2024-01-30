import PageTitle from "../page-header/PageHeader";

import GetAllTransaction from "./getAllTransaction";

const Transaction = () => {
  return (
    <div>
      <PageTitle title='Back' />
      <GetAllTransaction />
    </div>
  );
};

export default Transaction;
