import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboards: builder.query({
      query: ({ startdate, enddate }) => ({
        url: `dashboard?startdate=${startdate}&enddate=${enddate}`,
      }),
      providesTags: ["Dashboards"],
    }),
  }),
});

export const {
  useGetDashboardsQuery,
} = dashboardApi;
