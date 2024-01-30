import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../../../utils/functions";

export const taskTimeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTaskTimes: builder.query({
			query: () => ({
				url: `task-time?query=all`,
			}),
			providesTags: ["TaskTimes"],
		}),

		getTaskTime: builder.query({
			query: (id) => ({
				url: `task-time/${id}`,
			}),
		}),

		addTaskTime: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-time/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Task-Time added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskTimes"],
		}),

		updateTaskTime: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-time/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Task-Time updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskTimes"],
		}),

		deleteTaskTime: builder.mutation({
			query: (id) => ({
				url: `task-time/${id}`,
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
					toastHandler("Deleted transaction successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskTimes"],
		}),
	}),
});

export const {
	useGetTaskTimesQuery,
	useGetTaskTimeQuery,
	useAddTaskTimeMutation,
	useUpdateTaskTimeMutation,
	useDeleteTaskTimeMutation,
} = taskTimeApi;
