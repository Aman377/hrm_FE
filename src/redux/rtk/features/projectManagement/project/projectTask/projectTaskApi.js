import { apiSlice } from "./../../../api/apiSlice";
import { toastHandler } from "../../../../../../utils/functions";

export const projectTaskApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectTasks: builder.query({
			query: () => ({
				url: `tasks?status=true`,
			}),
			providesTags: ["ProjectTasks"],
		}),

		getProjectTask: builder.query({
			query: (id) => ({
				url: `tasks/${id}`,
			}),
			providesTags: ["ProjectTask"],
		}),

		addProjectTask: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `tasks/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("ProjectTask added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["ProjectTasks", "TaskStatusById"],
		}),

		updateProjectTask: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `tasks/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("ProjectTask updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["ProjectTasks", "ProjectTask"],
		}),

		updateProjectTaskStatus: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `tasks/${id}?query=taskStatus`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("ProjectTask Status updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["ProjectTasks", "ProjectTask"],
		}),

		deleteProjectTask: builder.mutation({
			query: (id) => ({
				url: `tasks/${id}`,
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
				// pessimistic user cache update
				try {
					await queryFulfilled;
					toastHandler("Deleted ProjectTask successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["ProjectTasks", "ProjectTask", "TaskStatusById"],
		}),
	}),
});

export const {
	useGetProjectTasksQuery,
	useGetProjectTaskQuery,
	useAddProjectTaskMutation,
	useUpdateProjectTaskMutation,
	useUpdateProjectTaskStatusMutation,
	useDeleteProjectTaskMutation,
} = projectTaskApi;
