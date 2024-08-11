import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getTrending = createAsyncThunk('media/trending', async (mediaType) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return { mediaType, results: data.results };
});

export const getPopularMovies = createAsyncThunk(
  'media/popularMovies',
  async ({ type, page = 1 }) => {
    let allMovies = [];
    let totalepage=0;
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${type}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6&page=${page}`
      );
      allMovies = [...allMovies, ...data.results];
      totalepage=data.total_pages;

    return {allMovies, totalepage};
  }
);


  export let getGenreItems = createAsyncThunk('media/genreItems', async () => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return data.genres; // Ici, nous retournons directement les genres
  });
  

export let initialState = {
    trendingMovies: [],
    trendingTv: [],
    trendingPeople: [],
    popularMovies: [],
    genreItems:[],
    getTotalePage:0,
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
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      const { allMovies, totalepage } = action.payload;
      state.popularMovies = allMovies; // Mettre à jour avec les films populaires
      state.getTotalePage = totalepage; // Mettre à jour avec le nombre total de pages
    });
    builder.addCase(getGenreItems.fulfilled, (state, action) => {
      state.genreItems = action.payload;
    });
  },
});


export let mediaReducer = mediaSlice.reducer;
