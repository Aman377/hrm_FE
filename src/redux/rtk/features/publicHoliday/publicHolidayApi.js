import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const PublicHolidayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublicHolidays: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `public-holiday?${query}`,
        }
      },
      providesTags: ["PublicHolidays"],
    }),

    getPublicHoliday: builder.query({
      query: (id) => ({
        url: `public-holiday/${id}`,
      }),
      providesTags: ["PublicHoliday"],
    }),

    addPublicHoliday: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `public-holiday/`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("PublicHoliday added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["PublicHolidays"],
    }),

    updatePublicHoliday: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `public-holiday/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("PublicHoliday updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["PublicHolidays", "PublicHoliday"],
    }),

    deletePublicHoliday: builder.mutation({
      query: (id) => ({
        url: `public-holiday/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted PublicHoliday successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["PublicHolidays", "PublicHoliday"],
    }),
  }),
});

export const {
  useGetPublicHolidaysQuery,
  useGetPublicHolidayQuery,
  useAddPublicHolidayMutation,
  useUpdatePublicHolidayMutation,
  useDeletePublicHolidayMutation,
} = PublicHolidayApi;
