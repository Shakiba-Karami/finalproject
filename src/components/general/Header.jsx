
import BackButton from "@/components/general/BackButton";
import User from "@/components/general/User";
import { useLocation, Link } from "react-router-dom";


const Header = () => {
    const location = useLocation();
    const path = location.pathname;
    const query = location.search;


    return (<>
    <header className="w-full sticky top-8 inset-x-3 z-10 grid grid-cols-3">
        <div className="col-start-1 flex justify-start">
            {path !== '/' && <BackButton/>}
        </div>
        <div className="col-start-2 flex justify-center">
            {path.startsWith('/list') && (
                <div className="text-center">
                    <h1 className="text-lg font-bold">Result</h1>
                    <p className="text-xs font-light opacity-40">
                        for : {path.startsWith('/list/genre') 
                        ? path.split('/list/genre/')[1]
                        : new URLSearchParams(query).get('query')} </p>
                </div>    
            )} 
        </div>
        <div className="col-start-3 flex justify-end">
            {path !== '/register' && <User/>}
        </div>


    </header>
    </>)
}
export default Header