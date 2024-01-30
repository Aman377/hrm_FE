import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../utils/functions";

export const announcementApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAnnouncements: builder.query({
			query: () => ({
				url: `announcement?query=all`,
			}),
			providesTags: ["Announcements"],
		}),

		getAnnouncement: builder.query({
			query: (id) => ({
				url: `announcement/${id}`,
			}),
			providesTags: ["Announcement"],
		}),

		addAnnouncement: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `announcement/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Announcement added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Announcements", "Announcement"],
		}),

		updateAnnouncement: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `announcement/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Announcement updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Announcements", "Announcement"],
		}),

		deleteAnnouncement: builder.mutation({
			query: (id) => ({
				url: `announcement/${id}`,
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
					toastHandler("Deleted announcement successful", "warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Announcements", "Announcement"],
		}),
	}),
});

export const {
	useGetAnnouncementsQuery,
	useGetAnnouncementQuery,
	useAddAnnouncementMutation,
	useUpdateAnnouncementMutation,
	useDeleteAnnouncementMutation,
} = announcementApi;
