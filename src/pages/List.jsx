
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

import Search from "@/components/Search";
import DispatchMovie from "@/components/DispatchMovie";
import DispatchList from "@/components/DispatchList";
import useSearchByGenre from "@/hooks/SearchByGenre";



const List = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query')
    const page = searchParams.get('page')
    const {filterValue} = useParams();

    useEffect(()=> {
        let url;
         if (filterValue) {
            url = `https://moviesapi.codingfront.dev/api/v1/genres/${filterValue}/movies?page=${page}`;
        } else if (query) {
            url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${query}&page=${page}`;
        }
    if (url) {
        dispatch(DispatchList(url));
    }
}, [dispatch, query, filterValue, page]);
    


    const { data, loading, error } = useSelector(state => state.list)
    const { data : movieData, loading : movieLoading, error : movieError } = useSelector((state) => state.movie)
    
    const movieIds = data.map(movie => movie.id);
    const SearchByGenre = useSearchByGenre();

    useEffect(()=>{
        movieIds.forEach(id => {
            if (!movieData[id]) { 
                dispatch(DispatchMovie(id));
            }
        });
    }, [dispatch]);



    return (
        <>
        <button onClick = {()=> navigate(-1)}>
                <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.30832 20C9.19865 20.0006 9.08993 19.9796 8.9884 19.9381C8.88686 19.8967 8.79452 19.8356 8.71665 19.7583L1.90832 12.95C1.52029 12.5629 1.21244 12.1031 1.00238 11.5969C0.792327 11.0907 0.684204 10.5481 0.684204 9.99999C0.684204 9.45193 0.792327 8.90925 1.00238 8.40304C1.21244 7.89683 1.52029 7.43704 1.90832 7.04999L8.71665 0.241658C8.79435 0.16396 8.88659 0.102326 8.98811 0.0602753C9.08963 0.018225 9.19844 -0.00341797 9.30832 -0.00341797C9.4182 -0.00341797 9.52701 0.018225 9.62853 0.0602753C9.73004 0.102326 9.82229 0.16396 9.89998 0.241658C9.97768 0.319357 10.0393 0.411599 10.0814 0.513117C10.1234 0.614636 10.1451 0.723442 10.1451 0.833325C10.1451 0.943208 10.1234 1.05201 10.0814 1.15353C10.0393 1.25505 9.97768 1.34729 9.89998 1.42499L3.09165 8.23333C2.62348 8.70208 2.36052 9.33749 2.36052 9.99999C2.36052 10.6625 2.62348 11.2979 3.09165 11.7667L9.89998 18.575C9.97809 18.6525 10.0401 18.7446 10.0824 18.8462C10.1247 18.9477 10.1465 19.0566 10.1465 19.1667C10.1465 19.2767 10.1247 19.3856 10.0824 19.4871C10.0401 19.5887 9.97809 19.6809 9.89998 19.7583C9.82212 19.8356 9.72977 19.8967 9.62824 19.9381C9.52671 19.9796 9.41799 20.0006 9.30832 20Z" fill="white"/>
                </svg>
        </button>
        <h1>Result</h1>
        <p>for : "{query}" </p>
        <Search/>
        {!loading && !error && (!data || data.length === 0) && <p>Ahhh... Where am I? Am I dead?</p>}
        {loading && <p>Loading list Data ...</p>}
        {error && <p>Error: {error}</p>}
        
        {!loading && !error && data && data.length > 0 && (<>
        <ul>{data.map((movieItem) => (
                <li key={movieItem.id} onClick={()=>navigate(`/item/${movieItem.id}`)}>
                    <img src={movieItem.poster} alt={movieItem.title} width = {137} height={137}/>
                    <h2>
                    {movieItem.title}
                    </h2>
                    <ul> {movieItem.genres.map((genre, index) => (
                        <li key={nanoid()} onClick={(e) => {e.stopPropagation(); SearchByGenre(genre);}}>
                            {genre}{index < movieItem.genres.length - 1 ? ', ' : ''}
                        </li>))}
                    </ul>
                    <div>{movieItem.year},{movieItem.country},
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.774081 7.23333L2.85075 8.75L2.06208 11.1924C1.93463 11.5712 1.93302 11.9811 2.05748 12.3609C2.18194 12.7407 2.42582 13.0701 2.75275 13.3C3.07408 13.5373 3.46348 13.6644 3.86292 13.6624C4.26237 13.6604 4.65047 13.5294 4.96942 13.2889L7 11.7944L9.03117 13.2872C9.35191 13.5231 9.73921 13.6512 10.1374 13.6532C10.5356 13.6551 10.9241 13.5308 11.2471 13.298C11.5701 13.0652 11.811 12.7359 11.9352 12.3576C12.0593 11.9793 12.0603 11.5713 11.9379 11.1924L11.1492 8.75L13.2259 7.23333C13.5462 6.99913 13.7844 6.66969 13.9063 6.29206C14.0282 5.91443 14.0276 5.50794 13.9047 5.13064C13.7818 4.75334 13.5428 4.42454 13.2218 4.19119C12.9009 3.95785 12.5144 3.8319 12.1176 3.83133H9.56666L8.79258 1.41867C8.67085 1.03889 8.43165 0.70759 8.10948 0.472537C7.78731 0.237484 7.3988 0.110825 7 0.110825C6.60119 0.110825 6.21269 0.237484 5.89052 0.472537C5.56834 0.70759 5.32914 1.03889 5.20742 1.41867L4.43333 3.83133H1.88475C1.48793 3.8319 1.10144 3.95785 0.780486 4.19119C0.459529 4.42454 0.220522 4.75334 0.0976022 5.13064C-0.0253174 5.50794 -0.0258614 5.91443 0.0960478 6.29206C0.217957 6.66969 0.456084 6.99913 0.776415 7.23333H0.774081Z" fill="#F2C94C"/>
                        </svg>
                    {movieItem.imdb_rating}</div>
                </li>
                ))
            }
        </ul></>)}
        </>
    )
}

export default List