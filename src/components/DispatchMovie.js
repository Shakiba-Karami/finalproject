import { movieLoading, movieDone, movieFailed } from "@/features/movieSlice";
import FetchData from "@/components/FetchData";

const DispatchMovie = (movieId) => async (dispatch) => {
    dispatch(movieLoading());
    try {
        const data = await FetchData(`https://moviesapi.codingfront.dev/api/v1/movies/${movieId}`);
        dispatch(movieDone(data));
    } catch (error) {
        dispatch(movieFailed(error.message));
    }
};

export default DispatchMovie;