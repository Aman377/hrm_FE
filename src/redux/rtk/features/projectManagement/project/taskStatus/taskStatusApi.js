import { apiSlice } from "./../../../api/apiSlice";
import { toastHandler } from "../../../../../../utils/functions";

export const taskStatusApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTaskStatus: builder.query({
			query: ({ status }) => ({
				url: `task-status?status=${status}`,
			}),
			providesTags: ["TaskStatusAll"],
		}),

		getAllTaskStatusByProjectId: builder.query({
			query: (id) => ({
				url: `task-status/${id}/project`,
			}),
			providesTags: ["TaskStatusById"],
		}),

		getTaskStatus: builder.query({
			query: (id) => ({
				url: `task-status/${id}`,
			}),
			providesTags: ["TaskStatus"],
		}),

		addTaskStatus: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-status/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Task-status added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskStatus", "TaskStatusAll", "TaskStatusById"],
		}),

		updateTaskStatus: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-status/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Task Status updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: [
				"TaskStatus",
				"TaskStatus",
				"TaskStatusAll",
				"TaskStatusById",
			],
		}),

		updateTaskStatusId: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-status/${id}?query=taskStatus`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Task Status updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: [
				"TaskStatus",
				"TaskStatus",
				"TaskStatusAll",
				"TaskStatusById",
			],
		}),

		deleteTaskStatus: builder.mutation({
			query: (id) => ({
				url: `task-status/${id}`,
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
					toastHandler("Deleted Task Status successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: [
				"TaskStatus",
				"TaskStatus",
				"TaskStatusAll",
				"TaskStatusById",
			],
		}),
	}),
});

export const {
	useGetAllTaskStatusQuery,
	useGetAllTaskStatusByProjectIdQuery,
	useGetTaskStatusQuery,
	useAddTaskStatusMutation,
	useUpdateTaskStatusMutation,
	useUpdateTaskStatusIdMutation,
	useDeleteTaskStatusMutation,
} = taskStatusApi;
