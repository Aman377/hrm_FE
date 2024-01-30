import {toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const emailConfigApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfigEmail: builder.query({
      query: () => ({
        url: `email-config`,
        }),
        transformResponse: (response) => [response],
      providesTags: ["ConfigEmail"],
    }),

    updateConfigEmail: builder.mutation({
      query: ( values ) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `email-config`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Config Email updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["ConfigEmail"],
    }),

  }),
});

export const {
  useGetConfigEmailQuery,
  useUpdateConfigEmailMutation,
} = emailConfigApi;
