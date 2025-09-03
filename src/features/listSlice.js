import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
    name: 'List',
    initialState: {    
    data : [],
    loading : false,
    error: null 
    },
    reducers : {
        listLoading : (state) => {
            state.loading = true;
            state.error = null;
            },
        listDone : (state, action) => {
            state.loading = false;
            state.data = action.payload;
            },
        listFailed : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            },
    }
})

export const {listDone, listFailed, listLoading} = listSlice.actions
export default listSlice.reducer
