
/* https://moviesapi.codingfront.dev/api/v1/movies/{movie_id}
{
id: 1,
title: "The Shawshank Redemption",
poster: "tt0111161_poster.jpg",
year: "1994",
rated: "R",
released: "14 Oct 1994",
runtime: "142 min",
director: "Frank Darabont",
writer: "Stephen King (short story "Rita Hayworth and Shawshank Redemption"), Frank Darabont (screenplay)",
actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
country: "USA",
awards: "Nominated for 7 Oscars. Another 19 wins &amp; 30 nominations.",
metascore: "80",
imdb_rating: "9.3",
imdb_votes: "1,738,596",
imdb_id: "tt0111161",
type: "movie",
genres: [
"Crime",
"Drama"
],
images: [
"https://moviesapi.codingfront.dev/images/tt0111161_backdrop.jpg"
]
}*/
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

import useSearchByGenre from "@/hooks/SearchByGenre";
import DispatchMovie from "@/components/DispatchMovie";

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
            <img src = {movie.images[0]} alt={movie.title}/>
            <button onClick = {()=> navigate(-1)}>
                <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.30832 20C9.19865 20.0006 9.08993 19.9796 8.9884 19.9381C8.88686 19.8967 8.79452 19.8356 8.71665 19.7583L1.90832 12.95C1.52029 12.5629 1.21244 12.1031 1.00238 11.5969C0.792327 11.0907 0.684204 10.5481 0.684204 9.99999C0.684204 9.45193 0.792327 8.90925 1.00238 8.40304C1.21244 7.89683 1.52029 7.43704 1.90832 7.04999L8.71665 0.241658C8.79435 0.16396 8.88659 0.102326 8.98811 0.0602753C9.08963 0.018225 9.19844 -0.00341797 9.30832 -0.00341797C9.4182 -0.00341797 9.52701 0.018225 9.62853 0.0602753C9.73004 0.102326 9.82229 0.16396 9.89998 0.241658C9.97768 0.319357 10.0393 0.411599 10.0814 0.513117C10.1234 0.614636 10.1451 0.723442 10.1451 0.833325C10.1451 0.943208 10.1234 1.05201 10.0814 1.15353C10.0393 1.25505 9.97768 1.34729 9.89998 1.42499L3.09165 8.23333C2.62348 8.70208 2.36052 9.33749 2.36052 9.99999C2.36052 10.6625 2.62348 11.2979 3.09165 11.7667L9.89998 18.575C9.97809 18.6525 10.0401 18.7446 10.0824 18.8462C10.1247 18.9477 10.1465 19.0566 10.1465 19.1667C10.1465 19.2767 10.1247 19.3856 10.0824 19.4871C10.0401 19.5887 9.97809 19.6809 9.89998 19.7583C9.82212 19.8356 9.72977 19.8967 9.62824 19.9381C9.52671 19.9796 9.41799 20.0006 9.30832 20Z" fill="white"/>
                </svg>
            </button>
            <img src = {movie.poster} alt={movie.title} height={637}/>
            <h1>{movie.title}</h1>
            <ul>{movie.genres.map((genre, index)=> <li key={nanoid()}
            onClick = {()=>{SearchByGenre(genre)}} 
            >{genre}{index < movie.genres.length - 1 ? ', ' : ''}</li>)}</ul>
            <div>{movie.plot}</div>
            <div>{movie.rated}</div>
            <div>{movie.year}</div>
            <div>{movie.runtime}</div>
            <div>{movie.imdb_rating}</div>
            <div>{movie.imdb_votes} ratings on IMDB</div>
            <div>{movie.ratings && 
                JSON.parse(movie.ratings)[1]?.Value} on {movie.ratings 
                && JSON.parse(movie.ratings)[1]?.Source}
            </div>
            <div>{movie.ratings &&
                 JSON.parse(movie.ratings)[2]?.Value} on {movie.ratings
                 && JSON.parse(movie.ratings)[2]?.Source}
            </div>
            <div className="details">
                <h2>Details</h2>
                <h3>Director</h3><span>{movie.director}</span>
                <h3>Writers</h3><span>{movie.writer}</span>
                <h3>Actors</h3><span>{movie.actors}</span>
                <h3>Country</h3><span>{movie.country}</span>
                <h3>Language</h3><span>{movie.language}</span>
                <h3>Awards</h3><span>{movie.awards}</span>
            </div>
            <button onClick = {()=>{}}>Add to Favorites</button>
            </>
        )
    }

    {!loading && !error && !movie && <p>Ahhh... Where am I? Am I dead?</p>}
    </> 
    )
};

export default Item