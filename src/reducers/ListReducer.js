/*export const initialState = {
    data : [],
    loading : false,
    error: null
};

export const ListReducer = (state, action) => {

    switch (action.type) {
        case 'fetchLoading' : 
            return {
                ...state, loading: true, error: null
            };
        case 'fetchDone' :
            return {
                ...state, loading: false, data: action.payload
            };
        case 'fetchFailed':
            return {
                ...state, loading: false,  error: action.payload
            }
        default : 
            return state
    }
}*/
import { createSlice } from 'reduxjs/toolkit'

