import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";


export const employmentStatusApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getEmploymentStatuses: builder.query({
			query: (arg) => {
				const query = buildQuery(arg);
				return {
					url: `employment-status?${query}`,
				};
			},
			providesTags: ["EmploymentStatuses"],
		}),

		getEmploymentStatus: builder.query({
			query: (id) => ({
				url: `employment-status/${id}`,
			}),
			providesTags: ["EmploymentStatus"],
		}),

		addEmploymentStatus: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `employment-status/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("EmploymentStatus added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["EmploymentStatuses"],
		}),

		updateEmploymentStatus: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `employment-status/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("EmploymentStatus updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["EmploymentStatuses", "EmploymentStatus"],
		}),

		deleteEmploymentStatus: builder.mutation({
			query: (id) => ({
				url: `employment-status/${id}`,
				method: "PUT",
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
					toastHandler("Deleted EmploymentStatus successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["EmploymentStatuses", "EmploymentStatus"],
		}),
	}),
});

export const {
	useGetEmploymentStatusesQuery,
	useGetEmploymentStatusQuery,
	useAddEmploymentStatusMutation,
	useUpdateEmploymentStatusMutation,
	useDeleteEmploymentStatusMutation,
} = employmentStatusApi;
