import { apiSlice } from "../api/apiSlice";
import { buildQuery, toastHandler } from "./../../../../utils/functions";

export const leaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: () => ({
        url: `leave-application?query=all`,
      }),
      providesTags: ["Leaves"],
    }),

    getLeavesByStatus: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `leave-application?${query}`,
        };
      },
      providesTags: ["LeaveByStatus"],
    }),

    getLeave: builder.query({
      query: (id) => ({
        url: `leave-application/${id}`,
      }),
      providesTags: ["Leave"],
    }),

    getLeaveHistory: builder.query({
      query: ({id, page, count}) => ({
        url: `leave-application/${id}/leaveHistory?page=${page}&count=${count}`,
      }),
      providesTags: ["LeaveHistory"],
    }),

    addLeave: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `leave-application/`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          toastHandler("Leave added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Leaves", "LeaveByStatus"],
    }),

    updateLeave: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `leave-application/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          toastHandler("Leave updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Leaves", "LeaveByStatus", "Leave"],
    }),

    reviewLeaveApp: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `leave-application/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          toastHandler("Leave reviewed successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Leaves", "LeaveByStatus", "Leave"],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useGetLeaveQuery,
  useAddLeaveMutation,
  useGetLeaveHistoryQuery,
  useUpdateLeaveMutation,
  useGetLeavesByStatusQuery,
  useReviewLeaveAppMutation,
} = leaveApi;
