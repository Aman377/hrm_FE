import PageTitle from "../page-header/PageHeader";
import AddUser from "./addUser";

const UserList = (props) => {
  return (
    <div>
      <PageTitle title='Back' />

      <h1 className='m-2 text-center text-2xl font-semibold mt-5 txt-color'>
        Add New Employee
      </h1>
      <AddUser />
    </div>
  );
};

export default UserList;
