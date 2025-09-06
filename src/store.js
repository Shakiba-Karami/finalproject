import { configureStore } from "@reduxjs/toolkit";

import  listReducer  from '@/features/listSlice';
import movieReducer from '@/features/movieSlice'
import userReducer from '@/features/userSlice'

export const store = configureStore({
    reducer: {
        list : listReducer,
        movie : movieReducer,
        user : userReducer,
    }
})