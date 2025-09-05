
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

import Search from "@/components/Search";
import DispatchMovie from "@/components/DispatchMovie";
import DispatchList from "@/components/DispatchList";
import useSearchByGenre from "@/hooks/SearchByGenre";
import Header from "@/components/general/header";



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
        <div className='px-8 py-3'>
        <Header/>
        <Search/>
        {!loading && !error && (!data || data.length === 0) && <p>Ahhh... Where am I? Am I dead?</p>}
        {loading && <p>Loading list Data ...</p>}
        {error && <p>Error: {error}</p>}
        
        {!loading && !error && data && data.length > 0 && (<>
        <ul className="py-8 flex flex-col gap-5">{data.map((movieItem) => (
                <li className="flex gap-5 w-full pb-5 border-b border-b-[var(--interactive-color)] justify-start cursor-pointer" key={movieItem.id} onClick={()=>navigate(`/item/${movieItem.id}`)}>
                    <img className="rounded-xl w-[122px] h-[122px] shrink-0" src={movieItem.poster} alt={movieItem.title}/>
                    <div className="grow flex-col justify-between">
                        <div> 
                            <div className="flex justify-between items-center">
                                <h2 className="grow text-2xl font-bold">
                                {movieItem.title}
                                </h2>
                                <svg className='shrink-0 cursor-pointer fill-white hover:fill-[var(--accent-color)]' width="24" height="23" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 0.917C16.3739 0.934515 15.2724 1.24885 14.3068 1.82827C13.3411 2.40769 12.5453 3.23167 12 4.217C11.4546 3.23167 10.6589 2.40769 9.69323 1.82827C8.72753 1.24885 7.62604 0.934515 6.49999 0.917C4.70493 0.994991 3.01369 1.78025 1.79577 3.10123C0.577848 4.42221 -0.0677617 6.17153 -1.11917e-05 7.967C-1.11917e-05 12.514 4.78599 17.48 8.79999 20.847C9.69621 21.6001 10.8293 22.013 12 22.013C13.1706 22.013 14.3038 21.6001 15.2 20.847C19.214 17.48 24 12.514 24 7.967C24.0677 6.17153 23.4221 4.42221 22.2042 3.10123C20.9863 1.78025 19.295 0.994991 17.5 0.917ZM13.915 19.317C13.379 19.7684 12.7007 20.0159 12 20.0159C11.2992 20.0159 10.621 19.7684 10.085 19.317C4.94699 15.006 1.99999 10.87 1.99999 7.967C1.93163 6.70172 2.36635 5.46073 3.20935 4.5147C4.05235 3.56867 5.23522 2.99435 6.49999 2.917C7.76476 2.99435 8.94763 3.56867 9.79063 4.5147C10.6336 5.46073 11.0683 6.70172 11 7.967C11 8.23222 11.1053 8.48657 11.2929 8.67411C11.4804 8.86164 11.7348 8.967 12 8.967C12.2652 8.967 12.5196 8.86164 12.7071 8.67411C12.8946 8.48657 13 8.23222 13 7.967C12.9316 6.70172 13.3664 5.46073 14.2094 4.5147C15.0523 3.56867 16.2352 2.99435 17.5 2.917C18.7648 2.99435 19.9476 3.56867 20.7906 4.5147C21.6336 5.46073 22.0683 6.70172 22 7.967C22 10.87 19.053 15.006 13.915 19.313V19.317Z"/>
                                </svg>
                            </div>
                            <ul className="text-xs font-light opacity-40 flex items-start gap-0.5 hover:opacity-100"> {movieItem.genres.map((genre, index) => (
                                <li className="cursor-pointer hover:text-[var(--accent-color)]" key={nanoid()} onClick={(e) => {e.stopPropagation(); SearchByGenre(genre);}}>
                                    {genre}{index < movieItem.genres.length - 1 ? ', ' : ''}
                                </li>))}
                            </ul>
                        </div>
                        <div className="gap-3 flex flex-wrap items-center py-1.5 text-lg font-normal opacity-80" >
                            <span>{movieItem.year}</span>
                            <div className="size-1.5 bg-[var(--interactive-color)] rounded-full"></div>
                            <span>{movieItem.country}</span>
                            <div className="size-1.5 bg-[var(--interactive-color)] rounded-full"></div>
                            <span className="flex items-center gap-1">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.774081 7.23333L2.85075 8.75L2.06208 11.1924C1.93463 11.5712 1.93302 11.9811 2.05748 12.3609C2.18194 12.7407 2.42582 13.0701 2.75275 13.3C3.07408 13.5373 3.46348 13.6644 3.86292 13.6624C4.26237 13.6604 4.65047 13.5294 4.96942 13.2889L7 11.7944L9.03117 13.2872C9.35191 13.5231 9.73921 13.6512 10.1374 13.6532C10.5356 13.6551 10.9241 13.5308 11.2471 13.298C11.5701 13.0652 11.811 12.7359 11.9352 12.3576C12.0593 11.9793 12.0603 11.5713 11.9379 11.1924L11.1492 8.75L13.2259 7.23333C13.5462 6.99913 13.7844 6.66969 13.9063 6.29206C14.0282 5.91443 14.0276 5.50794 13.9047 5.13064C13.7818 4.75334 13.5428 4.42454 13.2218 4.19119C12.9009 3.95785 12.5144 3.8319 12.1176 3.83133H9.56666L8.79258 1.41867C8.67085 1.03889 8.43165 0.70759 8.10948 0.472537C7.78731 0.237484 7.3988 0.110825 7 0.110825C6.60119 0.110825 6.21269 0.237484 5.89052 0.472537C5.56834 0.70759 5.32914 1.03889 5.20742 1.41867L4.43333 3.83133H1.88475C1.48793 3.8319 1.10144 3.95785 0.780486 4.19119C0.459529 4.42454 0.220522 4.75334 0.0976022 5.13064C-0.0253174 5.50794 -0.0258614 5.91443 0.0960478 6.29206C0.217957 6.66969 0.456084 6.99913 0.776415 7.23333H0.774081Z" fill="#F2C94C"/>
                                </svg>{movieItem.imdb_rating}
                            </span>
                        </div>
                    </div>
                </li>
                ))
            }
        </ul></>)}
        </div>
        </>
    )
}

export default List