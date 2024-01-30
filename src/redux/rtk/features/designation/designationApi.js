import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const designationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDesignations: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `designation?${query}`,
        };
      },
      providesTags: ["Designations"],
    }),

    getDesignationByEmployee: builder.query({
      query: () => ({
        url: `designation/employee`,
      }),
      providesTags: ["DesignationByEmployee"],
    }),

    getDesignation: builder.query({
      query: (id) => ({
        url: `designation/employee/${id}`,
      }),
      providesTags: ["Designation"],
    }),

    addDesignation: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `designation/`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Designations added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Designations", "DesignationByEmployee"],
    }),

    updateDesignation: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `designation/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Designations updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Designations", "Designation", "DesignationByEmployee"],
    }),

    deleteDesignation: builder.mutation({
      query: (id) => ({
        url: `designation/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Designations successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Designations", "Designation", "DesignationByEmployee"],
    }),
  }),
});

export const {
  useGetDesignationsQuery,
  useGetDesignationByEmployeeQuery,
  useGetDesignationQuery,
  useAddDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
} = designationApi;
