import { configureStore } from "@reduxjs/toolkit";
import { mediaReducer, themeReducer } from "./moviesslice";

let store = configureStore({
    reducer: {
        media: mediaReducer,
        theme: themeReducer,
    }
});

export default store;
