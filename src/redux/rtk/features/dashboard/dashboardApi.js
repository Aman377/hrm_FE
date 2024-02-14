import { apiSlice } from "../api/apiSlice";

const tenantKey = localStorage.getItem("x-tenant-key");
console.log("tenantKey", tenantKey);

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboards: builder.query({
      query: ({ startdate, enddate }) => ({
        // headers: {
        //   "x-tenant-key": tenantKey
        // },
        url: `dashboard?startdate=${startdate}&enddate=${enddate}`
      }),
      providesTags: ["Dashboards"],
    }),
  }),
});

export const {
  useGetDashboardsQuery,
} = dashboardApi;
