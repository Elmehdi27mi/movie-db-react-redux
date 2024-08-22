import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export let getTrending = createAsyncThunk('media/trending', async ({mediaType = 'movie', page = 1,endpoint='week'}) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/${endpoint}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6&page=${page}`);
    return { mediaType, results: data.results,totalepage: data.total_pages };
});


export const fetchTrendingAndVideos = createAsyncThunk(
  'media/fetchTrendingAndVideos',
  async ({ mediaType, endpoint }) => {
    const trendingResponse = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/${endpoint}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    const trending = trendingResponse.data.results;
    
    const videoPromises = trending.map(async (item) => {
      const videoResponse = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${item.id}/videos?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
      return { ...item, videos: videoResponse.data.results };
    });
    
    const moviesWithVideos = await Promise.all(videoPromises);
    return { mediaType, trending, moviesWithVideos }; // Ajoutez mediaType ici pour différencier les résultats
  }
)





export const getPopularMovies = createAsyncThunk(
  'media/popularMovies',
  async ({ mediaType = 'movie', page = 1, filters = {} }) => {
    // Ajouter les paramètres fixes nécessaires
    let filterParams = {
      api_key: 'b22e299473a6bd3b4ae42b1953fbd4b6',
      language: 'en-US',
      page,
      ...filters
    };

    let queryString = new URLSearchParams(filterParams).toString();

    let url = `https://api.themoviedb.org/3/discover/${mediaType}?${queryString}`;

    let { data } = await axios.get(url);
 
    const moviesWithMediaType = data.results.map(movie => ({
      ...movie,
      media_type: mediaType
    }));
    return {
      allMovies: moviesWithMediaType,
      totalepage: data.total_pages
    };
  }
);


export let getItemsByType = createAsyncThunk(
  'media/getItemsByType',
  async ({type="popular", mediaType = 'movie', page = 1}) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${type}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6&page=${page}`);

    const moviesWithMediaType = data.results.map(movie => ({
      ...movie,
      media_type: mediaType
    }));
    return   {
      itemsByType: moviesWithMediaType,
    totalepage: data.total_pages};
  }
);

export let getItemsBySearch = createAsyncThunk(
  'media/getItemsBySearch',
  async ({ query = "", page = 1 }) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b22e299473a6bd3b4ae42b1953fbd4b6&page=${page}&query=${query}`);
    console.log("///////////////////////////////");
    console.log(data.total_pages);
    return {
      itemsBySearch: data.results,  // Corrigez ici aussi, c'était incorrect
      totalepage: data.total_pages
    };
  }
);




  export let getGenreItems = createAsyncThunk('media/genreItems', async () => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return data.genres; 
  });
  

  export let initialState = {
    trendingMovies: [],
    trendingTv: [],
    popularPeople: [],
    popularMovies: [],
    genreItems: [],
    itemsByType: [],
    itemsBySearch: [],
    tvWithVideos:[],
    tvTrending:[],
    movieWithVideos:[],
    movieTrending:[],
    trending: [], 
    getTotalePage: 0,
    loading: false,
  };
  

let mediaSlice = createSlice({
  name: 'media',
  initialState,
  extraReducers: (builder) => {


    builder
    .addCase(getTrending.pending, (state) => {
      state.loading = true; // Début du chargement
    })
    .addCase(getTrending.fulfilled, (state, action) => {
      const { mediaType, results , totalepage } = action.payload;
      if (mediaType === 'movie') {
        state.trendingMovies = results;
        state.getTotalePage = totalepage;
      } else if (mediaType === 'tv') {
        state.trendingTv = results;
        state.getTotalePage = totalepage;
      } else if (mediaType === 'person') {
        state.popularPeople = results;
        state.getTotalePage = totalepage;
      }
    })
    .addCase(getTrending.rejected, (state) => {
      state.loading = false; 
    });
 
    builder
    .addCase(getPopularMovies.pending, (state) => {
      state.loading = true; // Début du chargement
    })
    .addCase(getPopularMovies.fulfilled, (state, action) => {
      const { allMovies, totalepage } = action.payload;
      state.popularMovies = allMovies;
      state.getTotalePage = totalepage;
      state.loading = false; // Fin du chargement
    })
    .addCase(getPopularMovies.rejected, (state) => {
      state.loading = false; // Fin du chargement même en cas d'erreur
    })
    builder.addCase(getGenreItems.fulfilled, (state, action) => {
      state.genreItems = action.payload;
    });



    builder
    .addCase(fetchTrendingAndVideos.fulfilled, (state, action) => {
      const { mediaType, trending, moviesWithVideos } = action.payload;
      
      // Séparer les résultats par type de média
      if (mediaType === 'movie') {
        state.movieTrending = trending;
        state.movieWithVideos = moviesWithVideos;
      } else if (mediaType === 'tv') {
        state.tvTrending = trending;
        state.tvWithVideos = moviesWithVideos;
      }

      state.loading = false;
    })
    .addCase(fetchTrendingAndVideos.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTrendingAndVideos.rejected, (state) => {
      state.loading = false;
    });


    builder
    .addCase(getItemsByType.pending, (state) => {
      state.loading = true; // Début du chargement
    })
    .addCase(getItemsByType.fulfilled, (state, action) => {
     const {itemsByType,totalepage} = action.payload;
     state.itemsByType=itemsByType;
     state.getTotalePage=totalepage;
      state.loading = false; // Fin du chargement
    })
    .addCase(getItemsByType.rejected, (state) => {
      state.loading = false; // Fin du chargement même en cas d'erreur
    })




    builder
    .addCase(getItemsBySearch.pending, (state) => {
      state.loading = true; // Début du chargement
    })
    .addCase(getItemsBySearch.fulfilled, (state, action) => {
      const { itemsBySearch, totalepage } = action.payload;  // Corrigez ici
      state.itemsBySearch=itemsBySearch;
     state.getTotalePage=totalepage;
      state.loading = false; // Fin du chargement
    })
    .addCase(getItemsBySearch.rejected, (state) => {
      state.loading = false; // Fin du chargement même en cas d'erreur
    })


  },




});


export let mediaReducer = mediaSlice.reducer;
