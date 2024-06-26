import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

const token = localStorage.getItem("access-token");

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `user?${query}`,
        };
      },
      providesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (id) => ({

        url: `user/${id}`,
      }),
      providesTags: ["User"],
    }),

    addUser: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/register`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          // toastHandler("Registration completed successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users"],
    }),

    addEducation: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        url: `user/education`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Education created successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("User updated successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users", "User"],
    }),

    updateDocument: builder.mutation({
      query: ({ id, fileType, values }) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/document/${id}/${fileType}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Document updated successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users", "User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
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
          toastHandler("User deleted successfully", "warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users", "User"],
    }),

    login: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/login`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem("access-token", data?.token);
          localStorage.setItem("role", data?.roleId);
          localStorage.setItem("user", data?.username);
          localStorage.setItem("firstName", data?.firstName);
          localStorage.setItem("lastName", data?.lastName);
          localStorage.setItem("id", data?.user_id);
          localStorage.setItem("isLogged", true);
          toastHandler("User logged in successfully", "success");
          window.location.href = "/admin/dashboard";
        } catch (err) {
          const errMsg = err?.error?.data?.message
          if (errMsg) {
            toastHandler(errMsg, "warning");
          } else {
            toastHandler("Something went wrong, Please try again", "warning");
          }
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useAddEducationMutation,
  useUpdateUserMutation,
  useLoginMutation,
  useDeleteUserMutation,
  useUpdateDocumentMutation,
} = userApi;
