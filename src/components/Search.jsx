/* https://moviesapi.codingfront.dev/api/v1/movies?q={name}&page={page}
{data: [
{id: 1,
title: "The Shawshank Redemption",
poster: "https://moviesapi.codingfront.dev/images/tt0111161.jpg",
genres: [
"Crime",
"Drama"
],
...,
metadata: {current_page: 1,
per_page: 2,
page_count: 25,
total_count: 250
}}*/
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ListContext } from '@/context/ListContext'
import Fetch from '@/components/Fetch'

const Search = ({url}) => {
    const {register, handleSubmit, watch} = useForm();
    const {dispatch} = useContext(ListContext);
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        // const nameQuery = watch('nameQuery');
        const page = 1;
        const url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${data.nameQuery}&page=${page}`
        Fetch(url, dispatch);
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