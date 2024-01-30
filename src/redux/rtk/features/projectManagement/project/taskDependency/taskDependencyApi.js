import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../../../utils/functions";

export const taskDependencyApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTaskDependencys: builder.query({
			query: () => ({
				url: `task-dependency?query=all`,
			}),
			providesTags: ["TaskDependency"],
		}),

		getTaskDependency: builder.query({
			query: (id) => ({
				url: `task-dependency/${id}`,
			}),
		}),

		addTaskDependency: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-dependency/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("TaskDependency added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskDependency"],
		}),

		updateTaskDependency: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task-dependency/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("TaskDependency updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskDependency"],
		}),

		deleteTaskDependency: builder.mutation({
			query: (id) => ({
				url: `task-dependency/${id}`,
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
					toastHandler("Deleted TaskDependency successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["TaskDependency"],
		}),
	}),
});

export const {
	useGetTaskDependencysQuery,
	useGetTaskDependencyQuery,
	useAddTaskDependencyMutation,
	useUpdateTaskDependencyMutation,
	useDeleteTaskDependencyMutation,
} = taskDependencyApi;
