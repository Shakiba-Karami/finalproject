
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Search from "@/components/Search";
import DispatchMovie from "@/components/DispatchMovie";
import useSearchByGenre from "@/hooks/SearchByGenre";



const List = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data, loading, error } = useSelector(state => state.list)
    const { data : movieData, loading : movieLoading, error : movieError } = useSelector((state) => state.movie)
    
    const SearchByGenre = useSearchByGenre()
    

    const handleClick = (movieId) => {
        dispatch(DispatchMovie(movieId))
        navigate('/item')
    }

    return (
        <>
        <Search/>
        {!loading && !error && (!data || data.length === 0) && <p>Ahhh... Where am I? Am I dead?</p>}
        {loading && <p>Loading list Data ...</p>}
        {error && <p>Error: {error}</p>}
        
        {!loading && !error && data && data.length > 0 && (<>
        <h1>Result</h1>
        <p>for : </p>
        <ul>{data.map((movieItem) => (
                <li key={movieItem.id} onClick={()=>handleClick(movieItem.id)}>
                    <img src={movieItem.poster} alt={movieItem.title} width = {137} height={137}/>
                    <div>
                    {movieItem.title}
                    </div>
                    <ul> {movieItem.genres.map((genre, index) => (
                        <li key={genre} onClick={() => SearchByGenre(genre)}>
                            {genre}{index < movieItem.genres.length - 1 ? ', ' : ''}
                        </li>
                    ))}</ul>
                    <div>{movieData.year},{movieData.country},star{movieData.imdb_rating}</div>
                </li>
                ))
            }
        </ul></>)}
        </>
    )
}

export default List