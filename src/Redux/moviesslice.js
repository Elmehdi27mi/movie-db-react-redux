import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getTrending = createAsyncThunk('media/trending', async (mediaType) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return { mediaType, results: data.results };
});

export let initialState = {
    trendingMovies: [],
    trendingTv: [],
    trendingPeople: [],
    loading: false,
};

let mediaSlice = createSlice({
    name: 'media',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTrending.fulfilled, (state, action) => {
            const { mediaType, results } = action.payload;
            if (mediaType === 'movie') {
                state.trendingMovies = results;
            } else if (mediaType === 'tv') {
                state.trendingTv = results;
            } else if (mediaType === 'person') {
                state.trendingPeople = results;
            }
        });
    }
});

export let mediaReducer = mediaSlice.reducer;
