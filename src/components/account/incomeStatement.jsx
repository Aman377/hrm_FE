import { Card } from "antd";
import React from "react";
import { useGetIncomeStatementQuery } from "../../redux/rtk/features/account/accountApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

const IncomeStatement = () => {
  const { data, isLoading } = useGetIncomeStatementQuery();
  if (isLoading) return <Loader />;
  return (
    <>
      <PageTitle title={"Back"} />
      <br />
      <UserPrivateComponent permission={"readSingle-account"}>
        <Card>
          <div>
            <div className='card-title  flex  justify-between'>
              <h5 className='text-xl mb-2'>
                <span className='ml-2 report-section-card-title'>
                  Income Statement{" "}
                </span>
              </h5>
            </div>
            <div className='border-gray-200 w-full rounded bg-white overflow-x-auto'>
              <table className=' w-full max-w-full mb-4 bg-transparent detail-account-table'>
                <h5 className='mt-2 mb-1 ml-2  font-semibold text-base'>
                  {" "}
                  Revenue{" "}
                </h5>
                <thead className='text-gray-600 text-xs font-semibold border-gray tracking-wider text-left px-5 py-3 hover:cursor-pointer uppercase border-b-2 border-gray-200'>
                  <tr className='border-b border-gray'>
                    <th
                      scope='col'
                      className='text-white border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'
                    >
                      Account
                    </th>
                    <th
                      scope='col'
                      className='text-white border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.revenue.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className='hover:bg-gray-100 hover:cursor-pointer'
                        >
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.subAccount}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.balance}
                          </td>
                        </tr>
                      );
                    })}


                  <tr className='hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      {" "}
                      <strong>TOTAL</strong>
                    </td>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>{data?.totalRevenue}</strong>
                    </td>
                  </tr>

                  <h5 className='mt-2 mb-1 ml-2  font-semibold text-base'>
                    {" "}
                    Expense
                  </h5>


                  {data &&
                    data?.expense.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className='hover:bg-gray-100 hover:cursor-pointer'
                        >
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.subAccount}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.balance}
                          </td>
                        </tr>
                      );
                    })}

                  <tr className='hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>TOTAL</strong>
                    </td>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>{data?.totalExpense}</strong>
                    </td>
                  </tr>

                  <h5 className='mt-2 mb-1 ml-2  font-semibold text-base'>
                    {" "}
                    Profit
                  </h5>
                  <tr className='hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      {" "}
                      <strong>Total </strong>
                    </td>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>{data?.profit}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </UserPrivateComponent>
    </>
  );
};

export default IncomeStatement;
