import { configureStore } from "@reduxjs/toolkit";
import containerReducer from "./reducers/containerReducer";

export const store = configureStore({
    reducer: {
        container: containerReducer,

    }
})