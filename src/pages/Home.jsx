//https://moviesapi.codingfront.dev/
import Header from '@/components/general/Header'
import Search from '@/components/Search'
import GenresList from '@/components/GenresList';

const Home = () => {
        console.log("inside Home")
    return (<>
        <Header/>
        <div className='px-3 text-center flex flex-col items-center justify-center h-screen my-auto'>
                <div className='text-[100px]/28 font-black w-full'>IAMDB</div> 
                <Search/>
                <GenresList/>
        </div>

    </> 
    )
};

export default Home