import { GetMonologueResponse, PodcastResponse } from "@/types/monologue";
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

interface MonologueGenerate {}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["YourMonologues", "Monologue"],
  endpoints: (builder) => ({
    getUsersMonologues: builder.query<PodcastResponse, void>({
      query: () => "/monologues/user",
      providesTags: ["YourMonologues"],
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
  useGetMonologueEpisodeStatusQuery,
  useGenerateNewMonologueMutation,
  useGetMonologueByIdQuery
  //   useAddTaskMutation,
  //   useUpdateTaskMutation,
  //   useDeleteTaskMutation,
} = api;
