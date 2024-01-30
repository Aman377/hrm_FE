import { toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendancePaginated: builder.query({
      query: ({ page, startdate, enddate, count }) => ({
        url: `attendance?page=${page}&count=${count}&startdate=${startdate}&enddate=${enddate}`,
      }),
      providesTags: ["Attendances"],
    }),

    getAttendanceByUserId: builder.query({
      query: ({id,page,count}) => ({
        url: `attendance/${id}/user?page=${page}&count=${count}`,
      }),
      providesTags: ["AttendanceById"],
    }),

    getAllAttendance: builder.query({
      query: () => ({
        url: `attendance?query=all`,
      }),
      providesTags: ["AttendanceAll"],
    }),

    getCurrentUserClockInStatus: builder.query({
      query: (id) => ({
        url: `attendance/${id}/last`,
      }),
      providesTags: ["AttendanceByClock"],
    }),

    getAttendance: builder.query({
      query: (id) => ({
        url: `attendance/${id}`,
      }),
      providesTags: ["Attendance"],
    }),

    addAttendance: builder.mutation({
      query: ({ values }) => {
        return {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          url: `attendance`,
          body: values,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Attendance added successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: [
        "Attendances",
        "AttendanceById",
        "Attendance",
        "AttendanceAll",
        "AttendanceByClock",
      ],
    }),

    addManualAttendance: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `attendance?query=manualPunch`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Attendance added successfully","success");
        } catch (err) {
        toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: [
        "Attendances",
        "AttendanceById",
        "Attendance",
        "AttendanceAll",
      ],
    }),
  }),
});

export const {
  useGetAttendancePaginatedQuery,
  useGetAttendanceByUserIdQuery,
  useGetAllAttendanceQuery,
  useGetCurrentUserClockInStatusQuery,
  useGetAttendanceQuery,
  useAddAttendanceMutation,
  useAddManualAttendanceMutation,
} = attendanceApi;
