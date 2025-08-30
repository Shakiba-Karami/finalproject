
const Fetch = (url, dispatch) => {
    dispatch ({type : 'fetchLoading'} )
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
                dispatch({type: 'fetchDone', payload: result.data})                 
            })
                .catch((error)=> {
                   dispatch({type: 'fetchFailed', payload : error}) 
            }) 
}

export default Fetch