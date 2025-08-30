/*list by genre https://moviesapi.codingfront.dev/api/v1/genres/{genre_name}/movies?page={page}
{data: [
{id: 1,
title: "The Shawshank Redemption",
poster: "https://moviesapi.codingfront.dev/images/tt0111161.jpg",
genres: [
"Crime",
"Drama"
],
images: [
"https://moviesapi.codingfront.dev/images/tt0111161_backdrop.jpg"
]
},...*/
import { useContext } from "react"

import { ListContext } from "../context/ListContext"

const List = () => {
    const { list } = useContext(ListContext)

    if (list.loading) return <h2>Loading...</h2>
    if (list.error) return <h2>Error: {list.error.message}</h2>
    if (!list.data || list.data.length === 0) return <h2>No results</h2>

    return (
        <><h1>inside List</h1>
        <ul>{list.data.map((movieItem) => (
                <li key={movieItem.id}>
                    <img src= {movieItem.poster} alt={movieItem.title}/>
                    {movieItem.title}
                </li>
                ))
            }
        </ul>
        </>
    )
}

export default List