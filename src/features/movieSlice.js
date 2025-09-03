import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice({
    name: 'Movie',
    initialState: {    
    data :{},
    loading : false,
    error: null 
    },
    reducers : {
        movieLoading : (state) => {
            state.loading = true;
            state.error = null;
            },
        movieDone : (state, action) => {
            state.loading = false;
            const movie = action.payload;   // the actual movie object from API
             state.data[movie.id] = movie;   // save under its id
            },
        movieFailed : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            },
    }
})

export const {movieDone, movieFailed, movieLoading} = movieSlice.actions
export default movieSlice.reducer
