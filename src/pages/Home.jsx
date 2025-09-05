//https://moviesapi.codingfront.dev/
import Header from '@/components/general/Header'
import Search from '@/components/Search'
import GenresList from '@/components/GenresList';
import SignIn from '../components/general/SignIn';

const Home = () => {
        console.log("inside Home")
    return (<><div className=' px-8 py-3 text-center'>
        <Header/>
        <SignIn/>
         <div className='text-[100px] font-black my-8'>IAMDB</div> 
        <Search/>
        <GenresList/>
    </div>
    </> 
    )
};

export default Home