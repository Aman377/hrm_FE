import { buildQuery, toastHandler } from "../../../../../../utils/functions";
import { apiSlice } from "../../../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query({
			query: () => ({
				url: `project?query=all`,
			}),
			providesTags: ["ProjectAll"],
		}),

		getProjectsByStatus: builder.query({
			query: (arg) => {
				const query = buildQuery(arg);
				return {
					url: `project?${query}`,
				};
			},
			providesTags: ["Projects"],
		}),

		getProject: builder.query({
			query: (id) => ({
				url: `project/${id}`,
			}),
			providesTags: ["Project"],
		}),

		addProject: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `project/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Project added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Projects", "ProjectAll"],
		}),

		updateProject: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `project/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				// pessimistic user cache update
				try {
					const { data } = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData("getProject", arg.id, () => data)
					);
					toastHandler("Project updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Projects", "ProjectAll"],
		}),

		deleteProject: builder.mutation({
			query: (id) => ({
				url: `project/${id}`,
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
					toastHandler("Deleted Project successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Projects", "Project", "ProjectAll"],
		}),
	}),
});

export const {
	useGetProjectsQuery,
	useGetProjectsByStatusQuery,
	useGetProjectQuery,
	useAddProjectMutation,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
} = projectApi;
