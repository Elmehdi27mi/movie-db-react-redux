import { configureStore } from "@reduxjs/toolkit";
import { mediaReducer } from "./moviesslice";

let store = configureStore({
    reducer: {
        media: mediaReducer,
    }
});

export default store;
