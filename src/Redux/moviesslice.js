import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define all your Thunks
export let getTrending = createAsyncThunk('media/trending', async ({mediaType = 'movie', page = 1, endpoint='week'}) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/${endpoint}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6&page=${page}`);
    return { mediaType, results: data.results, totalepage: data.total_pages };
});

export const getPeopleDetails = createAsyncThunk('media/getPeopleDetails', async ({ id=1 }) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
  console.log(data); // Vérifiez la structure des données
  return data;
});

export const getCombinedCredits = createAsyncThunk('media/getCombinedCredits', async ({ id }) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
  return data.cast;
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
);

export const getPopularMovies = createAsyncThunk(
  'media/popularMovies',
  async ({ mediaType = 'movie', page = 1, filters = {} }) => {
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
  async ({ type="popular", mediaType = 'movie', page = 1 }) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${type}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6&page=${page}`);
    const moviesWithMediaType = data.results.map(movie => ({
      ...movie,
      media_type: mediaType
    }));
    return { itemsByType: moviesWithMediaType, totalepage: data.total_pages };
  }
);

export let getItemsBySearch = createAsyncThunk(
  'media/getItemsBySearch',
  async ({ query = "", page = 1 }) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b22e299473a6bd3b4ae42b1953fbd4b6&page=${page}&query=${query}`);
    return {
      itemsBySearch: data.results,
      totalepage: data.total_pages
    };
  }
);

export let getGenreItems = createAsyncThunk('media/genreItems', async () => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return data.genres; 
});

export let getDetailsFilm = createAsyncThunk('media/detailsFilm', async ({ id, media_type }) =>{
    let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return data;
});

export let getRelatedMovies = createAsyncThunk('media/relatedMovies', async ({ id, media_type }) =>{
    let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    const moviesWithMediaType = data.results.map(movie => ({
      ...movie,
      media_type: media_type
    }));
    return moviesWithMediaType;
});

export let getCast = createAsyncThunk('media/cast', async ({ id, media_type }) =>{
    let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return data.cast; 
});

export let getTrailers = createAsyncThunk('media/trailers', async ({ id, media_type }) =>{
    let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    return data.results;
});


  export let initialState = {
    trendingMovies: [],
    trendingTv: [],
    popularPeople: [],
    peopleDetails:{},
    popularMovies: [],
    genreItems: [],
    itemsByType: [],
    itemsBySearch: [],
    tvWithVideos:[],
    tvTrending:[],
    movieWithVideos:[],
    movieTrending:[],
    trending: [], 
    itemDetails:[],
    relatedMovies:[],
    cast:[],
    trailers:[],
    getTotalePage: 0,
    loading: false,
  };
  

let mediaSlice = createSlice({
  name: 'media',
  initialState,
  extraReducers: (builder) => {


    builder
    // getTrending - fulfilled
    .addCase(getTrending.fulfilled, (state, action) => {
      const { mediaType, results , totalepage } = action.payload;
      if (mediaType === 'movie') {
        state.trendingMovies = results;
      } else if (mediaType === 'tv') {
        state.trendingTv = results;
      } else if (mediaType === 'person') {
        state.popularPeople = results;
      }
      state.getTotalePage = totalepage;
      state.loading = false;  // Fin du chargement
    })
    .addCase(getTrending.rejected, (state) => {
      state.loading = false;  // Fin du chargement en cas d'erreur
      console.error('Erreur lors de la récupération des données de tendance');
    });


    builder
    .addCase(getPeopleDetails.pending, (state) => {
      state.loading = true; // Début du chargement
    })
    .addCase(getPeopleDetails.fulfilled, (state, action) => {
       state.peopleDetails = action.payload;
     
      state.loading = false; // Fin du chargement
    })
    .addCase(getPeopleDetails.rejected, (state) => {
      state.loading = false; // Fin du chargement même en cas d'erreur
    })
    builder
    .addCase(getCombinedCredits.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCombinedCredits.fulfilled, (state, action) => {
      state.loading = false;
      state.combinedCredits = action.payload;
    })
    .addCase(getCombinedCredits.rejected, (state) => {
      state.loading = false;
      console.error('Erreur lors de la récupération des crédits combinés');
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


    builder
    // Details Film
    .addCase(getDetailsFilm.pending, (state) => {
      state.loading = true;
    })
    .addCase(getDetailsFilm.fulfilled, (state, action) => {
      state.loading = false;
      state.itemDetails = action.payload;
    })
    .addCase(getDetailsFilm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    // Related Movies
    .addCase(getRelatedMovies.pending, (state) => {
      state.loading = true;
    })
    .addCase(getRelatedMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedMovies = action.payload;
    })
    .addCase(getRelatedMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    // Cast
    .addCase(getCast.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCast.fulfilled, (state, action) => {
      state.loading = false;
      state.cast = action.payload;
    })
    .addCase(getCast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    // Trailers
    .addCase(getTrailers.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTrailers.fulfilled, (state, action) => {
      state.loading = false;
      state.trailers = action.payload;
    })
    .addCase(getTrailers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });




  },




});


export let mediaReducer = mediaSlice.reducer;





const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectIsDarkMode = (state) => state.theme.isDarkMode;
export let themeReducer = themeSlice.reducer;