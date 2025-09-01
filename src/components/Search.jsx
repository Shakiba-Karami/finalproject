import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DispatchList from '@/components/DispatchList'

const Search = ({url}) => {
    const {register, handleSubmit, watch} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const onSubmit = (data) => {
        // const nameQuery = watch('nameQuery');
        const page = 1;
        const url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${data.nameQuery}&page=${page}`
        dispatch(DispatchList(url));
        navigate('/list')
        
    }

    return (<>
    <form onSubmit = {handleSubmit(onSubmit)}>
        <button type='submit'
        //  disabled={!nameQuery}
         >
            Search
        </button>
        <input {...register('nameQuery')} placeholder='Search Here'/>
    </form>
    </>

    )
}
export default Search