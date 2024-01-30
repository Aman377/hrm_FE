import { apiSlice } from "../api/apiSlice";
import { toastHandler } from "../../../../utils/functions";

export const awardHistoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAwardHistorys: builder.query({
			query: () => ({
				url: `awardHistory?query=all`,
			}),
			providesTags: ["AwardHistory"],
		}),

		getAwardHistory: builder.query({
			query: (id) => ({
				url: `awardHistory/${id}`,
			}),
		}),

		addAwardHistory: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `awardHistory/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Award History added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");				}
			},
			invalidatesTags: ["AwardHistory", "User"],
		}),

		updateAwardHistory: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `awardHistory/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Award History updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");				}
			},
			invalidatesTags: ["AwardHistory", "User", "Awards"],
		}),

		deleteAwardHistory: builder.mutation({
			query: (id) => ({
				url: `awardHistory/${id}`,
				method: "DELETE",
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
					toastHandler("Deleted Award History successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["AwardHistory", "User"],
		}),
	}),
});

export const {
	useGetAwardHistorysQuery,
	useGetAwardHistoryQuery,
	useAddAwardHistoryMutation,
	useUpdateAwardHistoryMutation,
	useDeleteAwardHistoryMutation,
} = awardHistoryApi;
