import { apiSlice } from "../../../api/apiSlice";
import { toastHandler } from "../../../../../../utils/functions";

export const taskPriorityApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTaskPriorities: builder.query({
			query: () => ({
				url: `task-priority?query=all`,
			}),
			providesTags: ["TaskPriorities"],
		}),

		getTaskPriority: builder.query({
			query: (id) => ({
				url: `task-priority/${id}`,
			}),
			providesTags: ["TaskPriority"],
		}),

		addTaskPriority: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-priority/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Task-priority added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskPriority", "TaskPriorities"],
		}),

		updateTaskPriority: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-priority/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("TaskPriority updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskPriority", "TaskPriorities"],
		}),

		deleteTaskPriority: builder.mutation({
			query: (id) => ({
				url: `task-priority/${id}`,
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
					toastHandler("Deleted TaskPriority successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskPriority", "TaskPriorities"],
		}),
	}),
});

export const {
	useGetTaskPrioritiesQuery,
	useGetTaskPriorityQuery,
	useAddTaskPriorityMutation,
	useUpdateTaskPriorityMutation,
	useDeleteTaskPriorityMutation,
} = taskPriorityApi;
