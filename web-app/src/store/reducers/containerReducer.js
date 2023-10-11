import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    view: 'AdminHome',
    
};

export const containerSlice = createSlice({
    name:"container",
    initialState,
    reducers:{
        setView(state,action){
            state.view = action.payload
        },

    }
});

export const {setView} = containerSlice.actions

export default containerSlice.reducer;