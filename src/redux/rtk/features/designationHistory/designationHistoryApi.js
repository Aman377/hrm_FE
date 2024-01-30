import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../utils/functions";

export const DesHistoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDesignationHistories: builder.query({
      query: () => ({
        url: `designationHistory?status=true&page=1&count=20`,
      }),
      providesTags: ["DesignationHistories"],
    }),

    getDesHistory: builder.query({
      query: (id) => ({
        url: `designationHistory/${id}`,
      }),
      providesTags: ["DesignationHistory"],
    }),

    addDesHistory: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `designationHistory`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Designation History added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["DesignationHistories", "User"],
    }),

    updateDesHistory: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `designationHistory/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Designation History updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["DesignationHistories", "DesignationHistory", "User"],
    }),

    deleteDesHistory: builder.mutation({
      query: (id) => ({
        url: `designationHistory/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Designation History successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["DesignationHistories", "DesignationHistory", "User"],
    }),
  }),
});

export const {
  useGetDesHistoryQuery,
  useGetDesignationHistoriesQuery,
  useAddDesHistoryMutation,
  useUpdateDesHistoryMutation,
  useDeleteDesHistoryMutation,
} = DesHistoryApi;
