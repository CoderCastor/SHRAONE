import { api } from "@/lib/services/apiSlice";
import { PodcastResponse } from "@/types/monologue";
import { createSlice } from "@reduxjs/toolkit";

const InitialState : PodcastResponse[] = []

const yourMonologueSlice = createSlice({
    name : "yourMonologues",
    initialState : InitialState,
    reducers : {
        getMonologues : () => {

        }
}})

export default yourMonologueSlice.reducer