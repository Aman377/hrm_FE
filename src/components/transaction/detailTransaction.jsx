import { Card, Typography } from "antd";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import dayjs from "dayjs";
import {
  transactionApi,
  useGetTransactionQuery,
} from "../../redux/rtk/features/transaction/transactionApi";
import CommonDelete from "../CommonUi/CommonDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//PopUp

const DetailTransaction = () => {
  const { id } = useParams();

  const { data: payment } = useGetTransactionQuery(id);

  return (
    <div>
      <PageTitle title=' Back ' subtitle={`Payment ${id} information`} />

      <UserPrivateComponent permission={"readSingle-transaction"}>
        <div className='my-[40px]'>
          {payment ? (
            <Fragment key={payment.id}>
              <Card bordered={false} className='card-custom'>
                <div
                  className='flex justify-between items-center mb-2'
                  style={{ padding: 0 }}
                >
                  <h5>
                    <i className='bi bi-person-lines-fill'></i>
                    <span className='ml-[20px]'>
                      ID : {payment.id} | {payment.date}
                    </span>
                  </h5>
                  <div className='text-end'>
                    <CommonDelete
                      permission={"delete-transaction"}
                      deleteThunk={
                        transactionApi.endpoints.deleteTransaction.initiate
                      }
                      navigatePath={"/admin/transaction/"}
                      id={id}
                    />
                  </div>
                </div>
                <div>
                  <p>
                    <Typography.Text className='font-semibold'>
                      Date :
                    </Typography.Text>{" "}
                    {dayjs(payment.date).format("YYYY-MM-DD")}
                  </p>

                  <p>
                    <Typography.Text strong>Amount :</Typography.Text>{" "}
                    {payment.amount}
                  </p>

                  <p>
                    <Typography.Text strong>Particulars :</Typography.Text>{" "}
                    {payment.particulars}
                  </p>
                  <p>
                    <Typography.Text strong>Type :</Typography.Text>{" "}
                    {payment.type}
                  </p>
                </div>
              </Card>
            </Fragment>
          ) : (
            <Loader />
          )}
        </div>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailTransaction;
