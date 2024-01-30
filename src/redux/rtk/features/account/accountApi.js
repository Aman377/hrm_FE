import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrailBalance: builder.query({
      query: () => ({
        url: `account?query=tb`,
      }),
      providesTags: ["getTrailBalance"],
    }),

    getBalanceSheet: builder.query({
      query: () => ({
        url: `account?query=bs`,
      }),
      providesTags: ["getBalanceSheet"],
    }),

    getIncomeStatement: builder.query({
      query: () => ({
        url: `account?query=is`,
      }),
      providesTags: ["getIncomeStatement"],
    }),

    getMainAccount: builder.query({
      query: () => ({
        url: `account?query=ma`,
      }),
      providesTags: ["getMainAccount"],
    }),

    getSubAccount: builder.query({
      query: (id) => ({
        url: `account/${id}`,
      }),
      providesTags: ["getSubAccount"],
    }),

    getAccounts: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `account?${query}`,
        }
      },
      providesTags: ["getAccounts"],
    }),

    getAccount: builder.query({
      query: (id) => ({
        url: `account/${id}`,
      }),
      providesTags: ["getAccount"],
    }),

    addAccount: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `account/`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Account added successfully")
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning")
        }
      },
      invalidatesTags: ["getMainAccount", "getSubAccount", "getAccounts"],
    }),

    updateAccount: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `account/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("account updated successfully", "success")
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning")
        }
      },
      invalidatesTags: ["getMainAccount", "getSubAccount", "getAccounts"],
    }),

    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `account/${id}`,
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
          toastHandler("Deleted Account successful", "warning")
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["getMainAccount", "getSubAccount", "getAccounts"],
    }),
  }),
});

export const {
  useGetTrailBalanceQuery,
  useGetBalanceSheetQuery,
  useGetIncomeStatementQuery,
  useGetMainAccountQuery,
  useGetSubAccountQuery,
  useGetAccountsQuery,
  useGetAccountQuery,
  useAddAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApi;
