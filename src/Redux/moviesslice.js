import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getTrending = createAsyncThunk('media/trending', async (mediaType) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return { mediaType, results: data.results };
});
export let getPopularMovies = createAsyncThunk('media/popularMovies', async (type) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return data.results;
  });



//   export let fetchTrendingItems = createAsyncThunk('media/itemsdetails', async (mediatype,endpoint) => {
//     const { data } = await axios.get(`${BASE_URL}/trending/${mediatype}/${endpoint}?api_key=${API_KEY}`);
//       const items = data.results || [];
      
//       // Fetch videos for each movie
//       const itemsWithVideos = await Promise.all(
//         items.map(async (item) => {
//           const videoData = await axios.get(`${BASE_URL}/${mediatype}/${item.id}/videos?api_key=${API_KEY}`);
//           return { ...item, videos: videoData.data.results };
//         })
//       );
//   });









export let initialState = {
    trendingMovies: [],
    trendingTv: [],
    trendingPeople: [],
    popularMovies: [],
   // trendingItems:[],
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
            state.popularMovies = action.payload; 
          });
        //   builder.addCase(getPopularMovies.fulfilled, (state, action) => {
        //     state.trendingItems = action.payload; 
        //   });
        }

});

export let mediaReducer = mediaSlice.reducer;
