import {
  generateNextEpisodeResponseType,
  GetMonologue,
  GetMonologueResponse,
  PodcastResponse,
} from "@/types/monologue";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { METHODS } from "http";

interface EpisodePolling {
  success: boolean;
  data: {
    id: string;
    title: string;
    number: number;
    script: string;
    audioUrl: string;
    monologueId: string;
    status: "PENDING" | "GENERATING_AUDIO" | "READY";
    monologue: {
      thumbnailUrl: "PENDING" | string;
    };
  };
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: [
    "UsersMonologues",
    "Monologue",
    "creditBalance",
    "Comments",
    "TrendingMonologues",
    "RecommendedMonologues",
    "LikedMonologues"
  ],
  endpoints: (builder) => ({
    getUsersMonologues: builder.query<PodcastResponse, void>({
      query: () => "/monologues/user",
      providesTags: ["UsersMonologues"],
    }),
    getTrendingMonologues: builder.query<PodcastResponse, void>({
      query: () => "/monologues/trending",
      providesTags: ["TrendingMonologues"],
    }),

    getRecommendedMonologues: builder.query<PodcastResponse, void>({
      query: () => "/monologues/recommended",
      providesTags: ["RecommendedMonologues"],
    }),

    getLikedMonologues: builder.query<PodcastResponse, void>({
      query: () => "/monologues/liked",
      providesTags: ["LikedMonologues"],
    }),

    getMonologueById: builder.query<GetMonologueResponse, string>({
      query: (id) => `/monologues/episodes/${id}`,
      providesTags: (result, error, id) => [{ type: "Monologue", id }],
    }),

    getMonologueEpisodeStatus: builder.query<EpisodePolling, string>({
      query: (id) => `/monologues/status/${id}`,
    }),

    generateNewMonologue: builder.mutation<any, { idea: string }>({
      query: (input) => ({
        url: "/monologues/generate",
        method: "POST",
        body: input,
      }),
    }),

    generateNextEpisode: builder.mutation<
      generateNextEpisodeResponseType,
      { monologueId: string; number: number }
    >({
      query: (input) => ({
        url: "/monologues/generate/more",
        method: "POST",
        body: input,
      }),
    }),
    getCreditBalance: builder.query<
      { success: boolean; data: { credit: number } },
      void
    >({
      query: () => `/user/credit`,
      providesTags: ["creditBalance"],
    }),
    getCommentsByMonologueId: builder.query<
      {
        success: boolean;
        data: {
          id: string;
          comment: string;
          createdAt: string;
          user: { id: string; image: string; name: string };
        }[];
      },
      string
    >({
      query: (id) => `/monologues/comments/${id}`,
      providesTags: (result, error, id) => [{ type: "Comments", id }],
    }),

    postCommentOnMonologue: builder.mutation<
      { success: boolean },
      { comment: string; id: string }
    >({
      query: (input) => ({
        url: `/monologues/comments/${input.id}`,
        method: "POST",
        body: { comment: input.comment },
      }),
    }),

    updateTrendingMonologueLike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/monologues/trending/like/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["TrendingMonologues",],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            "getTrendingMonologues",
            undefined,
            (draft: PodcastResponse) => {
              const monologue = draft.data.find((m) => m.id === id);
              if (monologue) {
                monologue.isLiked = true;
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateTrendingMonologueDislike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/monologues/trending/dislike/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["TrendingMonologues"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            "getTrendingMonologues",
            undefined,
            (draft: PodcastResponse) => {
              const monologue = draft.data.find((m) => m.id === id);
              if (monologue) {
                monologue.isLiked = false;
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // addTask: builder.mutation({
    //   query: (task) => ({
    //     url: "/tasks",
    //     method: "POST",
    //     body: task,
    //   }),
    //   invalidatesTags: ["Tasks"],
    //   async onQueryStarted(task, { dispatch, queryFulfilled }) {
    //     const patchResult = dispatch(
    //       api.util.updateQueryData("getTasks", undefined, (draft) => {
    //         draft.unshift({ id: crypto.randomUUID(), ...task });
    //       }),
    //     );

    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo();
    //     }
    //   },
    // }),
    // updateTask: builder.mutation({
    //   query: ({ id, ...updatedTask }) => ({
    //     url: `/tasks/${id}`,
    //     method: "PATCH",
    //     body: updatedTask,
    //   }),
    //   invalidatesTags: ["Tasks"],
    //   async onQueryStarted(
    //     { id, ...updatedTask },
    //     { dispatch, queryFulfilled },
    //   ) {
    //     const patchResult = dispatch(
    //       api.util.updateQueryData("getTasks", undefined, (tasksList) => {
    //         const taskIndex = tasksList.findIndex((el) => el.id === id);
    //         tasksList[taskIndex] = { ...tasksList[taskIndex], ...updatedTask };
    //       }),
    //     );

    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo();
    //     }
    //   },
    // }),
    // deleteTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Tasks"],
    //   async onQueryStarted(id, { dispatch, queryFulfilled }) {
    //     const patchResult = dispatch(
    //       api.util.updateQueryData("getTasks", undefined, (tasksList) => {
    //         const taskIndex = tasksList.findIndex((el) => el.id === id);
    //         tasksList.splice(taskIndex, 1);
    //       }),
    //     );

    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo();
    //     }
    //   },
    // }),
  }),
});

export const {
  useGetUsersMonologuesQuery,
  useGetTrendingMonologuesQuery,
  useGetMonologueEpisodeStatusQuery,
  useGenerateNewMonologueMutation,
  useGetMonologueByIdQuery,
  useGenerateNextEpisodeMutation,
  useGetCreditBalanceQuery,
  useGetCommentsByMonologueIdQuery,
  usePostCommentOnMonologueMutation,
  useUpdateTrendingMonologueDislikeMutation,
  useUpdateTrendingMonologueLikeMutation,
  useGetRecommendedMonologuesQuery,
  useGetLikedMonologuesQuery
} = api;
