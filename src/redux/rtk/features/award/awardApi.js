import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const awardApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAwards: builder.query({
			query: (arg) => {
				const query = buildQuery(arg);
				return {
					url: `award?${query}`,
				}
			},
			providesTags: ["Awards"],
		}),

		getAward: builder.query({
			query: (id) => ({
				url: `award/${id}`,
			}),
			providesTags: ["Award"],
		}),

		addAward: builder.mutation({
			query: (values) => ({
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `award/`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Award added successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Awards", "Award"],
		}),

		updateAward: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `award/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;

					toastHandler("Award updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Awards", "Award"],
		}),

		deleteAward: builder.mutation({
			query: (id) => ({
				url: `award/${id}`,
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
					toastHandler("Deleted Award successful","warning");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Awards", "Award"],
		}),
	}),
});

export const {
	useGetAwardsQuery,
	useGetAwardQuery,
	useAddAwardMutation,
	useUpdateAwardMutation,
	useDeleteAwardMutation,
} = awardApi;
