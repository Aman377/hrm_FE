import { buildQuery, toastHandler } from "../../../../../../utils/functions";
import { apiSlice } from "../../../api/apiSlice";

export const projectTeamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectTeams: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `project-team?${query}`,
        }
      },
      providesTags: ["ProjectTeams"],
    }),

    getProjectTeamByProjectId: builder.query({
      query: (id) => ({
        url: `project-team/${id}/project`,
      }),
      providesTags: ["ProjectTeamsById"],
    }),

    getProjectTeam: builder.query({
      query: (id) => ({
        url: `project-team/${id}`,
      }),
      providesTags: ["ProjectTeam"],
    }),

    addProjectTeam: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `project-team/`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("ProjectTeam added successfully","success");
        } catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["ProjectTeams", "ProjectTeamsById"],
    }),

    updateProjectTeam: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `project-team/${id}?query=all`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("ProjectTeam updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["ProjectAll", "ProjectTeams", "ProjectTeam"],
    }),

    updateProjectTeamStatus: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `project-team/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("ProjectTeam Status updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["ProjectAll", "ProjectTeams", "ProjectTeam"],
    }),

    deleteProjectTeam: builder.mutation({
      query: (id) => ({
        url: `project-team/${id}`,
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
          toastHandler("Deleted ProjectTeam successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["ProjectTeams"],
    }),
  }),
});

export const {
	useGetProjectTeamsQuery,
	useGetProjectTeamByProjectIdQuery,
	useGetProjectTeamQuery,
	useAddProjectTeamMutation,
	useUpdateProjectTeamMutation,
	useUpdateProjectTeamStatusMutation,
	useDeleteProjectTeamMutation,
} = projectTeamApi;
