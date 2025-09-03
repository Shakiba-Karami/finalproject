import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import DispatchList from '@/components/DispatchList'

const useSearchByGenre = () => {
        const dispatch = useDispatch()
        const navigate = useNavigate();
        
        const page = 1;
        const searchByGenre = (genreName) => {
            dispatch(DispatchList(`https://moviesapi.codingfront.dev/api/v1/genres/${genreName}/movies?page=${page}`));
            navigate(`/list/genre/${genreName}?page=${page}`)        
        }
        return searchByGenre
    }

export default useSearchByGenre