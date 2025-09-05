import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

import useSearchByGenre from "@/hooks/SearchByGenre";
import DispatchMovie from "@/components/DispatchMovie";
import BackButton from "@/components/general/Backbutton";
import Header from "@/components/general/header";

const Item = () => {
    const { data, loading, error } = useSelector((state) => state.movie);
    const SearchByGenre = useSearchByGenre();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { movieId } = useParams();
    
    const movie = data[movieId]; // get the specific movie

    useEffect(()=> {
        if (!movie) {
            dispatch(DispatchMovie(movieId));}
    }, [movieId, movie]);

    return (<>
        {loading && <p>Loading Movie Data ...</p>}
        {error && <p>Error: {error}</p>}
        {movie && (<>
        <div className="relative w-full">
            <img src={movie.images[0]} className="w-full object-cover " />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-color)]/100 to-60%">
            <div className="pt-8 pb-16 px-3 md:mx-44.5">
                <Header/>
                <div className="md:flex flex-row-reverse md:gap-18 pt-25">
                    <div>
                        <h1 className="text-5xl font-bold">{movie.title}</h1>
                        {/* genres */}
                        <ul className="text-xs/normal font-light opacity-40 flex items-start gap-0.5 hover:opacity-100">
                            {movie.genres.map((genre, index)=>
                            <li className="cursor-pointer hover:text-[var(--accent-color)]" key={nanoid()} onClick = {()=>{SearchByGenre(genre)}}>
                                {genre}{index < movie.genres.length - 1 ? ', ' : ''}</li>)}
                        </ul>
                        <div className="opacity-60 text-sm/6 py-4.5">{movie.plot}</div>
                        {/* buttonish */}
                        <div className="flex flex-wrap justify-start gap-2 text-xs">
                            <div className="btn">{movie.rated}</div>
                            <div className="btn">{movie.year}</div>
                            <div className="btn">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12.5C2.6915 12.5 0 9.8085 0 6.5C0 3.1915 2.6915 0.5 6 0.5C9.3085 0.5 12 3.1915 12 6.5C12 9.8085 9.3085 12.5 6 12.5ZM6 1.5C3.243 1.5 1 3.743 1 6.5C1 9.257 3.243 11.5 6 11.5C8.757 11.5 11 9.257 11 6.5C11 3.743 8.757 1.5 6 1.5ZM6.25 6.933L7.982 5.933C8.2215 5.795 8.303 5.489 8.165 5.25C8.0265 5.0105 7.7205 4.928 7.482 5.067L6.5 5.634V3.5C6.5 3.2235 6.276 3 6 3C5.724 3 5.5 3.2235 5.5 3.5V6.5C5.5 6.6785 5.595 6.844 5.75 6.933C5.8275 6.9775 5.9135 7 6 7C6.0865 7 6.1725 6.9775 6.25 6.933Z" fill="white"/>
                                </svg>{movie.runtime}
                            </div>
                        </div>
                    </div>
                    <div className="md:flex flex-col-reverse md:gap-7.5">
                        {/* rating bar & ratings */}
                        <div className="flex justify-between gap-12 md:flex-col md:gap-7.5 py-4.5 md:py-0">
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
                            <div className="my-auto md:my-0 opacity-50 text-[13px]/6 font-normal">
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
                        <img className="w-full md:w-52 my-4.5 md:my-0 rounded-2xl shadow-2xl" src = {movie.poster} alt={movie.title} height={637}/>

                    </div>
                </div>
                {/* details */}
                <div className="table w-full">
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
                <button className="fixed bottom-3 inset-x-3 bg-[var(--accent-color)] cursor-pointer py-3 px-8 rounded-xl text-sm font-normal" onClick = {()=>{}}>Add to Favorites</button>
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