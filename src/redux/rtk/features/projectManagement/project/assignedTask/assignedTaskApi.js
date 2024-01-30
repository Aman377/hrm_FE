import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../../../utils/functions";

export const assignedTaskApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAssignedTasks: builder.query({
			query: () => ({
				url: `assigned-task?query=all`,
			}),
			providesTags: ["AssignedTasks"],
		}),

		getAssignedTask: builder.query({
			query: (id) => ({
				url: `assigned-task/${id}`,
			}),
		}),

		addAssignedTask: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `assigned-task/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("AssignedTask added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["AssignedTasks"],
		}),

		updateAssignedTask: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `assigned-task/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("AssignedTask updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["AssignedTasks"],
		}),

		deleteAssignedTask: builder.mutation({
			query: (id) => ({
				url: `assigned-task/${id}`,
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
					toastHandler("Deleted AssignedTask successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["AssignedTasks"],
		}),
	}),
});

export const {
	useGetAssignedTasksQuery,
	useGetAssignedTaskQuery,
	useAddAssignedTaskMutation,
	useUpdateAssignedTaskMutation,
	useDeleteAssignedTaskMutation,
} = assignedTaskApi;
