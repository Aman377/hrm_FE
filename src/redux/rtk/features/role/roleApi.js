import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `role?${query}`,
        }
      },
      providesTags: ["Roles"],
    }),

    getRole: builder.query({
      query: (id) => ({
        url: `role/${id}`,
      }),
      providesTags: ["Role"],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `role/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Role deleted successful", "warning");
          // getRoles();
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Role"],
    }),

    updateRole: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `role/${id}`,
        body: values,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Role updated successfully", "success");
          
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning")
          console.log("err: ", err);
        }
      },
      invalidatesTags: ["Role"],
    }),

    addRole: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `role`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("role added successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Roles"],
    }),

    getPermission: builder.query({
      query: () => ({
        url: `permission?query=all`,
      }),
      providesTags: ["Permissions"],
    }),

    addPermission: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `role-permission`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("role Permission successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Permissions", "Roles", "Role"],
    }),

    deletePermissions: builder.mutation({
      query: (value) => ({
        url: `role-permission?query=deletemany`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: value,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Permissions successful", "warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Permissions"],
    }),
  }),
});

export const {
  useGetRoleQuery,
  useDeleteRoleQuery,
  useUpdateRoleMutation,
  useGetRolesQuery,
  useAddRoleMutation,
  useGetPermissionQuery,
  useAddPermissionMutation,
  useDeletePermissionsMutation,
} = roleApi;
