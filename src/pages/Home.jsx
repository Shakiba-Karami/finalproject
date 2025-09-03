//https://moviesapi.codingfront.dev/
import Header from '@/components/general/Header'
import Search from '@/components/Search'
import GenresList from '@/components/GenresList';

const Home = () => {
        console.log("inside Home")
    return (<><div className='text-center'>
        <Header/>
         <div className='text-[100px] font-black my-8'>IAMDB</div> 
        <Search/>
        <GenresList/>
    </div>
    </> 
    )
};

export default Home