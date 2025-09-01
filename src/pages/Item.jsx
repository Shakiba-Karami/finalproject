
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
import { useSelector } from "react-redux";

import useSearchByGenre from "@/hooks/SearchByGenre";






const Item = () => {
    const { data, loading, error } = useSelector((state) => state.movie)
    const SearchByGenre = useSearchByGenre()



    return (<>
        <div>Movie Details</div>
        {loading && <p>Loading Movie Data ...</p>}
        {error && <p>Error: {error}</p>}
        {data && (<>
            <h1>{data.title}</h1>
            <ul>{data.genres.map((genre, index)=> <li 
            onClick = {()=>{SearchByGenre(genre)}} 
            >{genre}{index < data.genres.length - 1 ? ', ' : ''}</li>)}</ul>
            </>
        )
    }

    {!loading && !error && !data && <p>Ahhh... Where am I? Am I dead?</p>}
    </> 
    )
};

export default Item