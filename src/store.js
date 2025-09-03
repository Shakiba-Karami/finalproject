import { configureStore } from "@reduxjs/toolkit";

import  listReducer  from '@/features/listSlice';
import movieReducer from '@/features/movieSlice'

export const store = configureStore({
    reducer: {
        list : listReducer,
        movie : movieReducer
    }
})