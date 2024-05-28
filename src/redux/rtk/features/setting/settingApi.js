import { toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const settingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: () => ({
        url: `setting`,
      }),
      providesTags: ["setting"],
    }),

    getlastUser: builder.query({
      query: () => ({
        url: `setting/lastData`,
      }),
      providesTags: ["setting"],
    }),

    getCurrencys: builder.query({
      query: () => ({
        url: `setting/all/currency`,
      }),
      providesTags: ["setting"],
    }),

    updateSetting: builder.mutation({
      query: (values) => ({
        method: "POST",
        url: `setting`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Setting updated successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["setting"],
    }),

    updateCompanyPayslip: builder.mutation({
      query: (values) => ({
        method: "POST",
        url: `setting/companyPayslip`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Setting updated successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["setting"],
    }),
  }),
});

export const { useGetSettingQuery, useUpdateSettingMutation, useGetlastUserQuery, useGetCurrencysQuery, useUpdateCompanyPayslipMutation }
  = settingApi;
