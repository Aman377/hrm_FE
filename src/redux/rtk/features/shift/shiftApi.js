import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const shiftApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShifts: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `shift?${query}`,
        }
      },
      providesTags: ["Shifts"],
    }),

    getShift: builder.query({
      query: (id) => ({
        url: `shift/${id}`,
      }),
      providesTags: ["Shift"],
    }),

    addShift: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `shift`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("shift added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Shifts"],
    }),

    updateShift: builder.mutation({
      query: ({ id, shiftData }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `shift/${id}`,
        body: shiftData,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("shift updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Shift", "Shifts"],
    }),

    deleteShift: builder.mutation({
      query: (id) => ({
        url: `shift/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted shift successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Shift", "Shifts"],
    }),
  }),
});

export const {
  useGetShiftQuery,
  useGetShiftsQuery,
  useAddShiftMutation,
  useDeleteShiftMutation,
  useUpdateShiftMutation,
} = shiftApi;
