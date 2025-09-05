
import { useState, useEffect } from "react";

import FetchData from '@/components/FetchData'
import useSearchByGenre from "@/hooks/SearchByGenre";

const GenresList = () => {
    const [genres, setGenres] = useState(null);
    const [genresCount, setGenresCount] = useState(4)
    const SearchByGenre = useSearchByGenre()

    useEffect(()=> {
        const loadGenres = async () => {
            try {
            const data = await FetchData("https://moviesapi.codingfront.dev/api/v1/genres");
            console.log("Genres:", data);
            if (data && data.length > 0) 
                setGenres(data);
            } catch (err) {
            console.error("Error while loading genres:", err.message);
        }};
        loadGenres()
    },[]);
    if (!genres || genres.length === 0)  return null
    
    const showedGenres = genres.slice(0, genresCount)

    return (<ul className="w-full flex flex-wrap justify-center gap-2 text-xs px-5">{
            showedGenres.map((genreItem) => (
                    <li className='px-[12px] py-[6px] bg-[var(--interactive-color)] rounded-lg cursor-pointer' key = {genreItem.id} onClick={()=> SearchByGenre(genreItem.name)}>
                        {genreItem.name}</li>))
                }
            {genresCount < genres.length && (
                <button onClick={()=> {setGenresCount(genres.length)}} className='px-[12px] py-[6px] bg-[var(--interactive-color)] rounded-lg cursor-pointer whitespace-nowrap flex items-center gap-1.5'>Show More <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.81671 4.08584C3.87138 4.14007 3.91478 4.20458 3.94439 4.27567C3.97401 4.34675 3.98926 4.423 3.98926 4.50001C3.98926 4.57701 3.97401 4.65326 3.94439 4.72434C3.91478 4.79543 3.87138 4.85994 3.81671 4.91417L1.13921 7.58584C1.08453 7.64007 1.04114 7.70458 1.01152 7.77567C0.981906 7.84675 0.966659 7.923 0.966659 8.00001C0.966659 8.07701 0.981905 8.15326 1.01152 8.22434C1.04114 8.29543 1.08453 8.35994 1.13921 8.41417C1.2485 8.52282 1.39635 8.5838 1.55046 8.5838C1.70457 8.5838 1.85241 8.52282 1.96171 8.41417L4.63921 5.73667C4.96693 5.40855 5.151 4.96376 5.151 4.50001C5.151 4.03625 4.96693 3.59146 4.63921 3.26334L1.96171 0.585839C1.85306 0.478072 1.70641 0.417317 1.55338 0.416672C1.4766 0.416228 1.4005 0.430943 1.32943 0.459972C1.25836 0.489002 1.19372 0.531775 1.13921 0.585839C1.08453 0.640068 1.04114 0.704585 1.01152 0.775669C0.981906 0.846754 0.966659 0.922999 0.966659 1.00001C0.966659 1.07701 0.981906 1.15326 1.01152 1.22434C1.04114 1.29543 1.08453 1.35994 1.13921 1.41417L3.81671 4.08584Z" fill="white"/>
                    </svg>
                </button>
            )}</ul>)
};

export default GenresList