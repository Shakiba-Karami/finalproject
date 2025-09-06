import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";


import useSearchByGenre from "@/hooks/SearchByGenre";
import DispatchMovie from "@/components/DispatchMovie";
import Header from "@/components/general/header";
import { userFavorites } from "../features/userSlice";

const Item = () => {
    const { data, loading, error } = useSelector((state) => state.movie);
    const SearchByGenre = useSearchByGenre();
    const dispatch = useDispatch();
    
    const { movieId } = useParams();
    
    const movie = data[movieId]; //  specific movie

    useEffect(()=> {
        if (!movie) {
            dispatch(DispatchMovie(movieId));}

    }, [movieId, dispatch]);

    const {favorites} = useSelector((state) => state.user);
    const favoriteMovie = favorites?.some(fav => fav.id === Number(movieId));

    return (<>
        {loading && <p>Loading Movie Data ...</p>}
        {error && <p>Error: {error}</p>}
        {movie && (<>
        <div className="relative w-full">
            <img src={movie.images[0]} className="w-full object-cover " />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-color)]/100 to-60%">
            <div className="pt-8 pb-16 lg:pb-8 lg:mx-44.5">
                <Header/>
                <div className="lg:grid lg:grid-cols-[208px_1fr] lg:gap-x-18 px-3 pt-25">
                {/* right column */}
                    <div className="lg:col-start-2">
                        <div className="lg:flex lg:justify-between lg:items-center">
                            <h1 className="text-5xl font-bold grow">{movie.title}</h1>
                            <svg className={`hidden lg:inline-flex shrink-0 cursor-pointer transition-colors 
                               ${favoriteMovie ? "fill-[var(--accent-color)]" : "fill-white hover:fill-[var(--accent-color)]"}`}
                               onClick={(e) => {e.stopPropagation();
                                 dispatch(userFavorites(movie))}} 
                                 width="24" height="23" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 0.917C16.3739 0.934515 15.2724 1.24885 14.3068 1.82827C13.3411 2.40769 12.5453 3.23167 12 4.217C11.4546 3.23167 10.6589 2.40769 9.69323 1.82827C8.72753 1.24885 7.62604 0.934515 6.49999 0.917C4.70493 0.994991 3.01369 1.78025 1.79577 3.10123C0.577848 4.42221 -0.0677617 6.17153 -1.11917e-05 7.967C-1.11917e-05 12.514 4.78599 17.48 8.79999 20.847C9.69621 21.6001 10.8293 22.013 12 22.013C13.1706 22.013 14.3038 21.6001 15.2 20.847C19.214 17.48 24 12.514 24 7.967C24.0677 6.17153 23.4221 4.42221 22.2042 3.10123C20.9863 1.78025 19.295 0.994991 17.5 0.917ZM13.915 19.317C13.379 19.7684 12.7007 20.0159 12 20.0159C11.2992 20.0159 10.621 19.7684 10.085 19.317C4.94699 15.006 1.99999 10.87 1.99999 7.967C1.93163 6.70172 2.36635 5.46073 3.20935 4.5147C4.05235 3.56867 5.23522 2.99435 6.49999 2.917C7.76476 2.99435 8.94763 3.56867 9.79063 4.5147C10.6336 5.46073 11.0683 6.70172 11 7.967C11 8.23222 11.1053 8.48657 11.2929 8.67411C11.4804 8.86164 11.7348 8.967 12 8.967C12.2652 8.967 12.5196 8.86164 12.7071 8.67411C12.8946 8.48657 13 8.23222 13 7.967C12.9316 6.70172 13.3664 5.46073 14.2094 4.5147C15.0523 3.56867 16.2352 2.99435 17.5 2.917C18.7648 2.99435 19.9476 3.56867 20.7906 4.5147C21.6336 5.46073 22.0683 6.70172 22 7.967C22 10.87 19.053 15.006 13.915 19.313V19.317Z"/>
                            </svg>

                        </div>
                        {/* genres */}
                        <ul className="text-xs/normal font-light opacity-40 flex items-start gap-0.5 hover:opacity-100">
                            {movie.genres.map((genre, index)=>
                            <li className="cursor-pointer hover:text-[var(--accent-color)]" key={nanoid()} onClick = {()=>{SearchByGenre(genre)}}>
                                {genre}{index < movie.genres.length - 1 ? ', ' : ''}</li>)}
                        </ul>
                        {/* plot */}
                        <div className="opacity-60 text-sm/6 py-4.5 text-justify">{movie.plot}</div>
                        {/* buttonish */}
                        <div className="flex flex-wrap justify-start gap-2 text-xs ">
                            <div className="btn">{movie.rated}</div>
                            <div className="btn">{movie.year}</div>
                            <div className="btn">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12.5C2.6915 12.5 0 9.8085 0 6.5C0 3.1915 2.6915 0.5 6 0.5C9.3085 0.5 12 3.1915 12 6.5C12 9.8085 9.3085 12.5 6 12.5ZM6 1.5C3.243 1.5 1 3.743 1 6.5C1 9.257 3.243 11.5 6 11.5C8.757 11.5 11 9.257 11 6.5C11 3.743 8.757 1.5 6 1.5ZM6.25 6.933L7.982 5.933C8.2215 5.795 8.303 5.489 8.165 5.25C8.0265 5.0105 7.7205 4.928 7.482 5.067L6.5 5.634V3.5C6.5 3.2235 6.276 3 6 3C5.724 3 5.5 3.2235 5.5 3.5V6.5C5.5 6.6785 5.595 6.844 5.75 6.933C5.8275 6.9775 5.9135 7 6 7C6.0865 7 6.1725 6.9775 6.25 6.933Z" fill="white"/>
                                </svg>{movie.runtime}
                            </div>
                        </div>
                    </div>
                    {/* left column */}
                    <div className="lg:flex flex-col-reverse lg:justify-end lg:gap-7.5 lg:row-start-1 row-span-2">
                        {/* rating bar & ratings */}
                        <div className="flex justify-between gap-12 lg:flex-col lg:gap-7.5 py-4.5 lg:py-0">
                            <div className="flex justify-between items-center gap-3 h-full">
                                <div className="size-20 rounded-full p-6 flex items-center justify-center text-2xl font-bold"
                                style={{background: `conic-gradient(
                                var(--accent-color) 0% ${(movie.imdb_rating / 10) * 100}%,
                                var(--interactive-color) ${(movie.imdb_rating / 10) * 100}% 100%                                )`}}>
                                    <div className="size-16 bg-[var(--bg-color)] rounded-full p-4 ">
                                        {movie.imdb_rating}
                                    </div>
                                </div>
                                <div className="text-lg font-bold">{movie.imdb_votes} 
                                    <span className="opacity-60 block text-sm font-normal">ratings on IMDB</span></div>
                            </div>
                            <div className="my-auto lg:my-0 opacity-50 text-[13px]/6 font-normal">
                                <div >{movie.ratings && 
                                    JSON.parse(movie.ratings)[1]?.Value} on {movie.ratings 
                                        && JSON.parse(movie.ratings)[1]?.Source}
                                </div>
                                <div >{movie.ratings &&
                                    JSON.parse(movie.ratings)[2]?.Value} on {movie.ratings
                                        && JSON.parse(movie.ratings)[2]?.Source}
                                </div>
                            </div>
                        </div>
                        {/* poster */}
                        <img className="w-full lg:w-52 my-4.5 lg:my-0 rounded-2xl shadow-2xl" src = {movie.poster} alt={movie.title} height={637}/>
                        

                    </div>
                    {/* right column */}
                    {/* details */}
                    <div className="table w-full lg:my-4.5 lg:col-start-2">
                        <div className="table-header-group">
                            <div className="table-row">
                                <div className="table-cell text-[28px] font-bold leading-12">Details</div>
                            </div>
                        </div>                    
                        <div className="table-row-group">
                            <div className="table-row">
                                <h3 className="table-cell  w-40 py-3 border-b border-b-[var(--interactive-color)] text-base font-bold opacity-80">Directors</h3>
                                <span className="table-cell text-sm font-normal opacity-60  py-3 border-b border-b-[var(--interactive-color)]">{movie.director}</span>
                            </div>
                            <div className="table-row py-3">
                                <h3 className="table-cell w-40  text-base font-bold opacity-80 py-3 border-b border-b-[var(--interactive-color)]">Writers</h3>
                                <span className="table-cell text-sm font-normal opacity-60 py-3 border-b border-b-[var(--interactive-color)]">{movie.writer}</span>
                            </div>
                            <div className="table-row py-3">
                                <h3 className="table-cell  w-40 text-base font-bold opacity-80 py-3  border-b border-b-[var(--interactive-color)]">Actors</h3>
                                <span className="table-cell text-sm font-normal opacity-60 py-3  border-b border-b-[var(--interactive-color)]">{movie.actors}</span>
                            </div>
                            <div className="table-row py-3">
                                <h3 className="table-cell  w-40 text-base font-bold opacity-80 py-3  border-b border-b-[var(--interactive-color)]">Country</h3>
                                <span className="table-cell text-sm font-normal opacity-60  py-3 border-b border-b-[var(--interactive-color)]">{movie.country}</span>
                            </div>
                            <div className="table-row py-3">
                                <h3 className="table-cell w-40  text-base font-bold opacity-80  py-3 border-b border-b-[var(--interactive-color)]">Language</h3>
                                <span className="table-cell text-sm font-normal opacity-60  py-3 border-b border-b-[var(--interactive-color)]">{movie.language}</span>
                            </div>
                            <div className="table-row py-3">
                                <h3 className="table-cell  w-40 text-base font-bold opacity-80  py-3">Awards</h3>
                                <span className="table-cell text-sm font-normal opacity-60  py-3">{movie.awards}</span>
                            </div>
                        </div>
                        </div>  
                </div>
                  
                <button className="lg:hidden fixed bottom-3 inset-x-3 bg-[var(--accent-color)] cursor-pointer py-3 px-8 rounded-xl text-sm font-normal" onClick = {()=>{}}>Add to Favorites</button>
            </div>
        </div></div>
        </>

        )
    }

    {!loading && !error && !movie && <p>Ahhh... Where am I? Am I dead?</p>}
    </> 
    )
};

export default Item