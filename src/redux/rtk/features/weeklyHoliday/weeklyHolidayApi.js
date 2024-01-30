import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const weeklyHolidayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyHolidays: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `weekly-holiday?${query}`,
        }
      },
      providesTags: ["WeeklyHolidays"],
    }),

    getWeeklyHoliday: builder.query({
      query: (id) => ({
        url: `weekly-holiday/${id}`,
      }),
      providesTags: ["WeeklyHoliday"],
    }),

    addWeeklyHoliday: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `weekly-holiday/`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("weeklyHoliday added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["WeeklyHolidays"],
    }),

    updateWeeklyHoliday: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `weekly-holiday/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("weeklyHoliday updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["WeeklyHoliday", "WeeklyHolidays"],
    }),

    deleteWeeklyHoliday: builder.mutation({
      query: (id) => ({
        url: `weekly-holiday/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted weeklyHoliday successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["WeeklyHoliday", "WeeklyHolidays"],
    }),
  }),
});

export const {
  useGetWeeklyHolidayQuery,
  useGetWeeklyHolidaysQuery,
  useAddWeeklyHolidayMutation,
  useUpdateWeeklyHolidayMutation,
  useDeleteWeeklyHolidayMutation,
} = weeklyHolidayApi;
