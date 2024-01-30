import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const departmentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDepartments: builder.query({
			query: (arg) => {
				const query= buildQuery(arg);
				return{
					url: `department?${query}`,
				};
			},
			providesTags: ["Departments"],
		}),

		getDepartment: builder.query({
			query: (id) => ({
				url: `department/${id}`,
			}),
			providesTags: ["Department"],
		}),

		addDepartment: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `department`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Department completed successfully", 'success');
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Departments"],
		}),

		updateDepartment: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `department/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Department updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Departments", "Department"],
		}),

		deleteDepartment: builder.mutation({
			query: (id) => ({
				url: `department/${id}`,
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
					toastHandler("Deleted Department successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Departments", "Department"],
		}),
	}),
});

export const {
	useGetDepartmentsQuery,
	useGetDepartmentQuery,
	useAddDepartmentMutation,
	useUpdateDepartmentMutation,
	useDeleteDepartmentMutation,
} = departmentApi;
