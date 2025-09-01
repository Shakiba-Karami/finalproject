//https://moviesapi.codingfront.dev/
import Search from '@/components/Search'
import GenresList from '@/components/GenresList';

const Home = () => {
        console.log("inside Home")
    return (<>
    <div className="">IAMDB</div>    
        <Search/>
        <GenresList/>
    </> 
    )
};

export default Home