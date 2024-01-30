import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../utils/functions";

export const transactionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTransactions: builder.query({
			query: ({ page, count, startdate, enddate, status = true }) => ({
				url: `transaction?status=${status}&page=${page}&count=${count}&startdate=${startdate}&enddate=${enddate}`,
			}),
			providesTags: ["Transactions"],
		}),

		getTransaction: builder.query({
			query: (id) => ({
				url: `transaction/${id}`,
			}),
			providesTags: ["Transaction"],
		}),

		addTransaction: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `transaction/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Transaction added successfully", "success")
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning")
				}
			},
			invalidatesTags: ["Transactions"],
		}),

		updateTransaction: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `transaction/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Transaction updated successfully", "success")
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning")
				}
			},
			invalidatesTags: ["Transactions"],
		}),

		deleteTransaction: builder.mutation({
			query: (id) => ({
				url: `transaction/${id}`,
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				body: {
					status: "false",
				},
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Deleted transaction successful", "warning")
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning")
				}
			},
			invalidatesTags: ["Transactions", "Transaction"],
		}),
	}),
});

export const {
	useGetTransactionQuery,
	useGetTransactionsQuery,
	useAddTransactionMutation,
	useUpdateTransactionMutation,
	useDeleteTransactionMutation,
} = transactionApi;
