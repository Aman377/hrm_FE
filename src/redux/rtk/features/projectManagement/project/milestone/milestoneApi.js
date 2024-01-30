import { toastHandler } from "../../../../../../utils/functions";
import { apiSlice } from "./../../../api/apiSlice";

export const milestoneApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMilestones: builder.query({
      query: () => ({
        url: `milestone?query=all`,
      }),
      providesTags: ["Milestones"],
    }),

    getMilestoneByProjectId: builder.query({
      query: (id) => ({
        url: `milestone/${id}/project`,
      }),
      providesTags: ["MilestoneById"],
    }),

    getMilestone: builder.query({
      query: (id) => ({
        url: `milestone/${id}`,
      }),
      providesTags: ["Milestone"],
    }),

    addMilestone: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `milestone/`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Milestones added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");        }
      },
      invalidatesTags: ["Milestones", "MilestoneById", "Milestone"],
    }),

    updateMilestone: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `milestone/${id}?query=all`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Milestones updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Milestones", "MilestoneById", "Milestone"],
    }),

    updateMilestoneStatus: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `milestone/${id}/status`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Milestones Status updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Milestones", "MilestoneById", "Milestone"],
    }),

    deleteMilestone: builder.mutation({
      query: (id) => ({
        url: `milestone/${id}`,
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: {
          status: "DELETED",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Milestones successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Milestones", "MilestoneById", "Milestone"],
    }),
  }),
});

export const {
  useGetMilestonesQuery,
  useGetMilestoneByProjectIdQuery,
  useGetMilestoneQuery,
  useAddMilestoneMutation,
  useUpdateMilestoneMutation,
  useUpdateMilestoneStatusMutation,
  useDeleteMilestoneMutation,
} = milestoneApi;
