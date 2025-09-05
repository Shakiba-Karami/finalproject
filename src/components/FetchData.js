const FetchData = (url, method = 'GET', payload = null) => {
    const postData= {};
    if (method === "POST" && payload) {
    postData.method = "POST";
    postData.headers = { "Content-Type": "application/json" };
    postData.body = JSON.stringify(payload);
    }
    return fetch(url)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`oops ${response.status}`);
                    console.log("response of our fetch is an object as",response);
                return response.json();            
            })
                .then((result) => {
                    if (!result || result.length === 0) {
                        throw new Error("No data found");
                    }
                    console.log("we make json of our response & result will be as", result);
                    console.log(result)
                    return result
                });
}

export default FetchData