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
// import { useContext } from "react"

// import { ListContext } from "../context/ListContext"
import { useSelector } from "react-redux";



const List = () => {
    // const { list } = useContext(ListContext)
    
    // if (list.loading) return <h2>Loading...</h2>
    // if (list.error) return <h2>Error: {list.error.message}</h2>
    // if (!list.data || list.data.length === 0) return <h2>No results</h2>
    const { data, loading, error } = useSelector(state => state.list)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!data || data.length === 0) return <p>No results</p>


    return (
        <><h1>inside List</h1>
        <ul>{data.map((movieItem) => (
                <li key={movieItem.id}>
                    <img src= {movieItem.poster} alt={movieItem.title} width = {137}/>
                    <div>
                    {movieItem.title}
                    </div>
                </li>
                ))
            }
        </ul>
        </>
    )
}

export default List