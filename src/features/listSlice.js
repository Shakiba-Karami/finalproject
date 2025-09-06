import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
    name: 'List',
    initialState: {    
    moviesList : [],
    loading : false,
    error: null,
    page: 1,
    hasMore: false,
    },
    reducers : {
        listLoading : (state) => {
            state.loading = true;
            state.error = null;
            },
        listDone : (state, action) => {
            state.loading = false;
            const {data, metadata} = action.payload
            state.moviesList = [...state.moviesList, ...data];
             state.hasMore = metadata.current_page < metadata.page_count;
              state.page = metadata.current_page + 1;
            },
        listFailed : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            },
        listReset: (state) => {
            state.moviesList = [];
            state.loading = false;
            state.error = null;
            state.page = 1;
            state.hasMore = false;
            }
    }
})

export const {listDone, listFailed, listLoading, listReset} = listSlice.actions
export default listSlice.reducer
