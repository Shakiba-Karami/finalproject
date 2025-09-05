import { userLoading, userSignedIn, userSignInFailed } from "@/features/userSlice";
import FetchData from "@/components/FetchData";

const DispatchUser = () => async () => {
    dispatch(userLoading());
    try {
        const data = await FetchData(`https://moviesapi.codingfront.dev/oauth/token`);
        dispatch(userSignInFailed(data));
    } catch (error) {
        dispatch(userSignInFailed(error.message));
    }
};

export default DispatchUser;