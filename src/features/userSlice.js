import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'User',
    initialState: {    
    data : {},
    loading : false,
    error: null ,
    favorites: [],
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
        userFavorites : (state, action) => {
            if (state.favorites.find(fav => fav.id === action.payload.id)) {
                state.favorites = state.favorites.filter(fav => fav.id !== action.payload.id);
            } else {
                state.favorites.push(action.payload);
            }}
    }
})

export const {userLoading, userSignedIn, userSignInFailed, userFavorites} = userSlice.actions
export default userSlice.reducer
