import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../utils/functions";

export const educationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: () => ({
        url: `education?status=true&page=1&count=20`,
      }),
      providesTags: ["Educations"],
    }),

    getSingleEducation: builder.query({
      query: (id) => ({
        url: `education/${id}`,
      }),
      providesTags: ["Education"],
    }),

    addEducation: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `education`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Education added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Educations", "User"],
    }),

    updateEducation: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `education/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Education updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Educations", "Education", "User"],
    }),

    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Education successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Educations", "User"],
    }),
  }),
});

export const {
  useGetEducationsQuery,
  useGetSingleEducationQuery,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
