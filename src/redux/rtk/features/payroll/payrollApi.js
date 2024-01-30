import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";
import { addPayslip } from "./payrollSlice";

export const payrollApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPayrolls: builder.query({
			query: () => ({
				url: `payroll/all`,
			}),
			providesTags: ["Payrolls"],
		}),

		getPayslips: builder.query({
			query: ({ month, year }) => ({
				url: `payroll?salaryMonth=${month}&salaryYear=${year}`,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(addPayslip(data));
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			providesTags: ["PaySlips"],
		}),

		getPayslipForPaymentMonthWise: builder.query({
			query: (arg) => {
				const query = buildQuery(arg);
				return { url: `payroll/all?${query}` };
			},
			providesTags: ["PaySlipsByMonth"],
		}),

		getPayroll: builder.query({
			query: (id) => ({
				url: `payroll/${id}`,
			}),
			providesTags: ["Payroll"],
		}),

		addPayroll: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `payroll/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Payroll added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Payrolls", "PaySlips", "PaySlipsByMonth"],
		}),

		updatePayroll: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `payroll/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Payroll updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Payrolls", "Payroll", "PaySlips", "PaySlipsByMonth"],
		}),

		deletePayroll: builder.mutation({
			query: (id) => ({
				url: `payroll/${id}`,
				method: "DELETE",
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

					toastHandler("Deleted Payroll successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Payrolls", "Payroll", "PaySlips", "PaySlipsByMonth"],
		}),
	}),
});

export const {
	useGetPayrollsQuery,
	useGetPayslipsQuery,
	useGetPayslipForPaymentMonthWiseQuery,
	useGetPayrollQuery,
	useAddPayrollMutation,
	useUpdatePayrollMutation,
	useDeletePayrollMutation,
} = payrollApi;
