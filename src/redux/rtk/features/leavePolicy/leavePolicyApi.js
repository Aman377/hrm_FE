import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const leavePolicyApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLeavePolicies: builder.query({
			query: (arg) => {
				const query = buildQuery(arg);
				return {
					url: `leave-policy?${query}`,
				}
			},
			providesTags: ["LeavePolicies"],
		}),

		getLeavePolicy: builder.query({
			query: (id) => ({
				url: `leave-policy/${id}`,
			}),
			providesTags: ["LeavePolicy"],
		}),

		addLeavePolicy: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `leave-policy/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;

					toastHandler("LeavePolicys added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["LeavePolicies"],
		}),

		updateLeavePolicy: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `leave-policy/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;

					toastHandler("LeavePolicys updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["LeavePolicies", "LeavePolicy"],
		}),

		deleteLeavePolicy: builder.mutation({
			query: (id) => ({
				url: `leave-policy/${id}`,
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

					toastHandler("Deleted LeavePolicys successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["LeavePolicies", "LeavePolicy"],
		}),
	}),
});

export const {
	useGetLeavePoliciesQuery,
	useGetLeavePolicyQuery,
	useAddLeavePolicyMutation,
	useUpdateLeavePolicyMutation,
	useDeleteLeavePolicyMutation,
} = leavePolicyApi;
