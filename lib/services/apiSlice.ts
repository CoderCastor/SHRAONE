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
    "LikedMonologues",
    "FullScreenData",
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
    updateMonologueLike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/monologues/like/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [
        "TrendingMonologues",
        "LikedMonologues",
        "UsersMonologues",
        "RecommendedMonologues",
        "FullScreenData",
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchTrendingMonologues = dispatch(
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

        const patchUsersMonologues = dispatch(
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

        const patchRecommendedMonologues = dispatch(
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

        const patchLikedMonologues = dispatch(
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

        const patchUpdateFullscreenCardData = dispatch(
          api.util.updateQueryData(
            "getFullScreenCardData",
            id,
            (draft: GetMonologueResponse) => {
              draft.data.isLiked = true;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchTrendingMonologues.undo();
          patchLikedMonologues.undo();
          patchRecommendedMonologues.undo();
          patchUsersMonologues.undo();
          patchUpdateFullscreenCardData.undo();
        }
      },
    }),
    updateMonologueDislike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/monologues/dislike/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [
        "TrendingMonologues",
        "UsersMonologues",
        "LikedMonologues",
        "RecommendedMonologues",
        "FullScreenData",
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchTrendingMonologues = dispatch(
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

        const patchUsersMonologues = dispatch(
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

        const patchRecommendedMonologues = dispatch(
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

        const patchLikedMonologues = dispatch(
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

        const patchUpdateFullscreenCardData = dispatch(
          api.util.updateQueryData(
            "getFullScreenCardData",
            id,
            (draft: GetMonologueResponse) => {
              draft.data.isLiked = false;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchTrendingMonologues.undo();
          patchLikedMonologues.undo();
          patchRecommendedMonologues.undo();
          patchUsersMonologues.undo();
          patchUpdateFullscreenCardData.undo();
        }
      },
    }),
    getFullScreenCardData: builder.query<GetMonologueResponse, string>({
      query: (id) => `/monologues/card/${id}`,
      providesTags: (result, error, id) => [{ type: "FullScreenData", id }],
    }),
    generateShareableLink: builder.mutation<
      {
        success: boolean;
        data: {
          link: string;
        };
      },
      string
    >({
      query: (input) => ({
        url: `/link/generate/${input}`,
        method: "POST",
      }),
    }),
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
  useUpdateMonologueLikeMutation,
  useUpdateMonologueDislikeMutation,
  useGetRecommendedMonologuesQuery,
  useGetLikedMonologuesQuery,
  useGetFullScreenCardDataQuery,
  useGenerateShareableLinkMutation,
} = api;
