import { listLoading, listDone, listFailed } from '@/features/listSlice'
import FetchData from '@/components/FetchData'

const DispatchList = (url) => async (dispatch) => {
    dispatch (listLoading() )
    try {
        const data = await FetchData(url);
        dispatch(listDone(data.data))                 
    } catch (error) {
             dispatch(listFailed(error.message)) 
            }
}

export default DispatchList