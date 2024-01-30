import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../utils/functions";

export const salaryHistoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalaryHistories: builder.query({
      query: () => ({
        url: `salaryHistory?status=true&page=1&count=20`,
      }),
      providesTags: ["SalaryHistories"],
    }),

    getSingleSalaryHistory: builder.query({
      query: (id) => ({
        url: `salaryHistory/${id}`,
      }),
      providesTags: ["SalaryHistory"],
    }),

    addSalaryHistory: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `salaryHistory`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Salary History added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["SalaryHistories", "User"],
    }),

    updateSalaryHistory: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `salaryHistory/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Salary History updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["SalaryHistories", "SalaryHistory", "User"],
    }),

    deleteSalaryHistory: builder.mutation({
      query: (id) => ({
        url: `salaryHistory/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Salary History successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["SalaryHistories", "SalaryHistory", "User"],
    }),
  }),
});

export const {
  useGetSalaryHistoriesQuery,
  useGetSingleSalaryHistoryQuery,
  useAddSalaryHistoryMutation,
  useUpdateSalaryHistoryMutation,
  useDeleteSalaryHistoryMutation,
} = salaryHistoryApi;
