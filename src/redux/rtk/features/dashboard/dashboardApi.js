import { apiSlice } from "../api/apiSlice";

// const tenantKey = localStorage.getItem("x-tenant-key");
// console.log("tenantKey", tenantKey);

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboards: builder.query({
      query: ({ startdate, enddate }) => ({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `dashboard?startdate=${startdate}&enddate=${enddate}`
      }),
      providesTags: ["Dashboards"],
    }),
  }),
});

export const {
  useGetDashboardsQuery,
} = dashboardApi;
