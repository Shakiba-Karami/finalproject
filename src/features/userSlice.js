import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'User',
    initialState: {    
    data : {},
    loading : false,
    error: null 
    },
    reducers : {
        userLoading : (state) => {
            state.loading = true;
            state.error = null;
            },
        userSignedIn : (state, action) => {
            state.loading = false;
            state.data = action.payload;
            },
        userSignInFailed : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            },
    }
})

export const {userLoading, userSignedIn, userSignInFailed} = userSlice.actions
export default userSlice.reducer
