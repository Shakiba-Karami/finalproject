import { fetchLoading, fetchDone, fetchFailed } from '@/features/listSlice'

const Fetch = (url, dispatch) => {
    dispatch (fetchLoading() )
    fetch(url)
        .then((response) => {
            if (!response.ok)
                throw new Error(`oops ${response.status}`);
                console.log("response of our fetch is an object as",response);
            return response.json();            
        })
            .then((result) => {
                if (!result.data || result.data.length === 0) {
                    throw new Error("No data found");
                }
                console.log("we make json of our response & result will be as", result);
                console.log(result.data)
                dispatch(fetchDone(result.data))                 
            })
                .catch((error)=> {
                   dispatch(fetchFailed(error.message)) 
            }) 
}

export default Fetch