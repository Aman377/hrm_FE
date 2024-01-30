import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../utils/functions";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getPayments: builder.query({
    //   query: () => ({
    //     url: `assigned-task?query=all`,
    //   }),
    //   providesTags: ["Payments"],
    // }),

    // getPayment: builder.query({
    //   query: (id) => ({
    //     url: `payroll/payment/${id}`,
    //   }),
    // }),

    addPayment: builder.mutation({
      query: (id) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `payroll/payment/${id}`,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Payments added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Payrolls", "PaySlips", "PaySlipsByMonth"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useAddPaymentMutation,
  // useUpdatePaymentMutation,
  // useDeletePaymentMutation,
} = paymentApi;
