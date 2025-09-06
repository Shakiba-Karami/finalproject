
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import InfiniteScroll from 'react-infinite-scroll-component';


import Search from "@/components/Search";
import DispatchMovie from "@/components/DispatchMovie";
import DispatchList from "@/components/DispatchList";
import useSearchByGenre from "@/hooks/SearchByGenre";
import Header from "@/components/general/header";
import { listReset } from '@/features/listSlice'



const List = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const {filterValue} = useParams();

    const { moviesList, loading, error, page, hasMore } = useSelector(state => state.list);

    const urlBasedFetch = (page) => {
        let url;
        if (filterValue) {
            url = `https://moviesapi.codingfront.dev/api/v1/genres/${filterValue}/movies?page=${page}`;
        } else if (query) {
            url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${query}&page=${page}`;
        }
        if (url) {
            dispatch(DispatchList(url));
        }
        }

    useEffect(()=> {
        dispatch(listReset());
        urlBasedFetch(1);
    }, [query, filterValue]);

    const fetchMore = () => {
        if (!loading && hasMore) {
            urlBasedFetch(page);
  }    };
    
    const movieIds = moviesList.map(movie => movie.id);
    const SearchByGenre = useSearchByGenre();

    const { data : movieData, loading : movieLoading, error : movieError } = useSelector((state) => state.movie)
    useEffect(()=>{
        movieIds.forEach(id => {
            if (!movieData[id]) { 
                dispatch(DispatchMovie(id));
            }
        });
    }, [dispatch, moviesList]);


    return (
        <>
            <Header/>
        <div className='px-3 py-3'>
            <Search />
                {loading && (<div className="flex flex-col items-center gap-5 text-red-500">
                    <svg className="size-20 fill-[var(--accent-color)] animate-spin"
                        viewBox="0 0 1024 1024"   xmlns="http://www.w3.org/2000/svg"  version="1.1">
                        <path d="M523.085935 101.849403m-101.850403 0a101.850403 101.850403 0 1 0 203.700806 0 101.850403 101.850403 0 1 0-203.700806 0Z" />
                        <path d="M769.836489 187.508901m-96.031437 0a96.031437 96.031437 0 1 0 192.062875 0 96.031437 96.031437 0 1 0-192.062875 0Z" />
                        <path d="M903.286707 381.395765m-90.210471 0a90.210471 90.210471 0 1 0 180.420943 0 90.210471 90.210471 0 1 0-180.420943 0Z" />
                        <path d="M905.950692 609.722427m-84.390506 0a84.390506 84.390506 0 1 0 168.781011 0 84.390506 84.390506 0 1 0-168.781011 0Z" />
                        <path d="M799.997313 786.127394m-78.57054 0a78.57054 78.57054 0 1 0 157.141079 0 78.57054 78.57054 0 1 0-157.141079 0Z" />
                        <path d="M605.196454 889.708787m-72.750574 0a72.750574 72.750574 0 1 0 145.501148 0 72.750574 72.750574 0 1 0-145.501148 0Z" />
                        <path d="M397.148673 877.857856m-66.931608 0a66.931608 66.931608 0 1 0 133.863216 0 66.931608 66.931608 0 1 0-133.863216 0Z" />
                        <path d="M223.665689 762.483532m-61.110641 0a61.110642 61.110642 0 1 0 122.221283 0 61.110642 61.110642 0 1 0-122.221283 0Z" />
                        <path d="M134.483212 587.14856m-55.290676 0a55.290676 55.290676 0 1 0 110.581352 0 55.290676 55.290676 0 1 0-110.581352 0Z" />
                        <path d="M135.396207 408.896604m-49.47071 0a49.47071 49.47071 0 1 0 98.94142 0 49.47071 49.47071 0 1 0-98.94142 0Z" />
                        <path d="M205.336797 260.047476m-43.650744 0a43.650744 43.650744 0 1 0 87.301488 0 43.650744 43.650744 0 1 0-87.301488 0Z" />
                        <path d="M315.81515 159.990063m-37.829779 0a37.829778 37.829778 0 1 0 75.659557 0 37.829778 37.829778 0 1 0-75.659557 0Z" />
                        </svg>
                    </div>)
                }
                {error && (<div className="flex flex-col items-center gap-5 text-red-500">
                        <p>Error: </p>
                        <svg className="size-24" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        style={{verticalAlign: "middle",    fill: "currentColor", overflow: "hidden"}}>
                        <path d="M512 981.333333c259.2 0 469.333333-210.133333 469.333333-469.333333S771.2 42.666667 512 42.666667 42.666667 252.8 42.666667 512s210.133333 469.333333 469.333333 469.333333z m0 42.666667C229.226667 1024 0 794.773333 0 512S229.226667 0 512 0s512 229.226667 512 512-229.226667 512-512 512z" />
                        <path d="M706.88 724.266667a21.333333 21.333333 0 1 1-31.616 28.629333A212.992 212.992 0 0 0 516.736 682.666667a213.44 213.44 0 0 0-126.890667 41.6 21.333333 21.333333 0 0 1-25.322666-34.325334A256.085333 256.085333 0 0 1 516.714667 640a255.637333 255.637333 0 0 1 190.165333 84.266667zM330.346667 424.533333l-60.330667 60.330667a21.333333 21.333333 0 0 1-30.165333-30.165333l60.330666-60.352-60.330666-60.330667a21.333333 21.333333 0 0 1 30.165333-30.165333l60.330667 60.330666 60.352-60.330666a21.333333 21.333333 0 1 1 30.165333 30.165333l-60.352 60.330667 60.352 60.352a21.333333 21.333333 0 1 1-30.165333 30.165333l-60.352-60.352zM693.013333 424.533333l-60.330666 60.330667a21.333333 21.333333 0 0 1-30.165334-30.165333l60.330667-60.352-60.330667-60.330667a21.333333 21.333333 0 1 1 30.165334-30.165333l60.330666 60.330666 60.352-60.330666a21.333333 21.333333 0 1 1 30.165334 30.165333l-60.352 60.330667 60.352 60.352a21.333333 21.333333 0 1 1-30.165334 30.165333l-60.352-60.352z" />
                        </svg>
                        {error}
                    </div>
                )}
                <InfiniteScroll className="!overflow-clip"
                    dataLength={moviesList.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={moviesList.length > 0 &&
                        (<div className="flex flex-col items-center gap-5">
                            <svg className="size-13 fill-[var(--accent-color)] animate-spin"
                                viewBox="0 0 1024 1024"   xmlns="http://www.w3.org/2000/svg"  version="1.1">
                                <path d="M523.085935 101.849403m-101.850403 0a101.850403 101.850403 0 1 0 203.700806 0 101.850403 101.850403 0 1 0-203.700806 0Z" />
                                <path d="M769.836489 187.508901m-96.031437 0a96.031437 96.031437 0 1 0 192.062875 0 96.031437 96.031437 0 1 0-192.062875 0Z" />
                                <path d="M903.286707 381.395765m-90.210471 0a90.210471 90.210471 0 1 0 180.420943 0 90.210471 90.210471 0 1 0-180.420943 0Z" />
                                <path d="M905.950692 609.722427m-84.390506 0a84.390506 84.390506 0 1 0 168.781011 0 84.390506 84.390506 0 1 0-168.781011 0Z" />
                                <path d="M799.997313 786.127394m-78.57054 0a78.57054 78.57054 0 1 0 157.141079 0 78.57054 78.57054 0 1 0-157.141079 0Z" />
                                <path d="M605.196454 889.708787m-72.750574 0a72.750574 72.750574 0 1 0 145.501148 0 72.750574 72.750574 0 1 0-145.501148 0Z" />
                                <path d="M397.148673 877.857856m-66.931608 0a66.931608 66.931608 0 1 0 133.863216 0 66.931608 66.931608 0 1 0-133.863216 0Z" />
                                <path d="M223.665689 762.483532m-61.110641 0a61.110642 61.110642 0 1 0 122.221283 0 61.110642 61.110642 0 1 0-122.221283 0Z" />
                                <path d="M134.483212 587.14856m-55.290676 0a55.290676 55.290676 0 1 0 110.581352 0 55.290676 55.290676 0 1 0-110.581352 0Z" />
                                <path d="M135.396207 408.896604m-49.47071 0a49.47071 49.47071 0 1 0 98.94142 0 49.47071 49.47071 0 1 0-98.94142 0Z" />
                                <path d="M205.336797 260.047476m-43.650744 0a43.650744 43.650744 0 1 0 87.301488 0 43.650744 43.650744 0 1 0-87.301488 0Z" />
                                <path d="M315.81515 159.990063m-37.829779 0a37.829778 37.829778 0 1 0 75.659557 0 37.829778 37.829778 0 1 0-75.659557 0Z" />
                                </svg>
                        </div>)}
                    endMessage={!loading && !error && moviesList.length > 0 && (
                        <p style={{ textAlign: 'center' }}>
                        <b className="p-8">Yay! You have seen it all</b>
                        </p>)
                    }>
                {!loading && !error && moviesList && moviesList.length > 0 && (<>
                    
                        <ul className="flex flex-col">{moviesList.map((movieItem) => (
                                <li className="group hover:scale-102 hover:px-3 hover:bg-[var(--interactive-color)]/50 flex gap-5 w-full py-5 border-b border-b-[var(--interactive-color)] justify-start cursor-pointer" 
                                    key={movieItem.id} onClick={()=>navigate(`/item/${movieItem.id}`)}>
                                    <img src={movieItem.poster} alt={movieItem.title}  className="rounded-xl w-[122px] h-[122px] shrink-0" />
                                    <div className="grow flex-col justify-between">
                                        {/* title & like btn & genres */}
                                        <div> 
                                            <div className="flex justify-between items-center">
                                                <h2 className="group-hover:text-[var(--accent-color)] grow text-2xl font-bold">
                                                {movieItem.title}
                                                </h2>
                                                <svg className='group-hover:animate-bounce shrink-0 cursor-pointer fill-white hover:fill-[var(--accent-color)]' width="24" height="23" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.5 0.917C16.3739 0.934515 15.2724 1.24885 14.3068 1.82827C13.3411 2.40769 12.5453 3.23167 12 4.217C11.4546 3.23167 10.6589 2.40769 9.69323 1.82827C8.72753 1.24885 7.62604 0.934515 6.49999 0.917C4.70493 0.994991 3.01369 1.78025 1.79577 3.10123C0.577848 4.42221 -0.0677617 6.17153 -1.11917e-05 7.967C-1.11917e-05 12.514 4.78599 17.48 8.79999 20.847C9.69621 21.6001 10.8293 22.013 12 22.013C13.1706 22.013 14.3038 21.6001 15.2 20.847C19.214 17.48 24 12.514 24 7.967C24.0677 6.17153 23.4221 4.42221 22.2042 3.10123C20.9863 1.78025 19.295 0.994991 17.5 0.917ZM13.915 19.317C13.379 19.7684 12.7007 20.0159 12 20.0159C11.2992 20.0159 10.621 19.7684 10.085 19.317C4.94699 15.006 1.99999 10.87 1.99999 7.967C1.93163 6.70172 2.36635 5.46073 3.20935 4.5147C4.05235 3.56867 5.23522 2.99435 6.49999 2.917C7.76476 2.99435 8.94763 3.56867 9.79063 4.5147C10.6336 5.46073 11.0683 6.70172 11 7.967C11 8.23222 11.1053 8.48657 11.2929 8.67411C11.4804 8.86164 11.7348 8.967 12 8.967C12.2652 8.967 12.5196 8.86164 12.7071 8.67411C12.8946 8.48657 13 8.23222 13 7.967C12.9316 6.70172 13.3664 5.46073 14.2094 4.5147C15.0523 3.56867 16.2352 2.99435 17.5 2.917C18.7648 2.99435 19.9476 3.56867 20.7906 4.5147C21.6336 5.46073 22.0683 6.70172 22 7.967C22 10.87 19.053 15.006 13.915 19.313V19.317Z"/>
                                                </svg>
                                            </div>
                                            <ul className="text-xs font-light opacity-40 flex items-start gap-0.5 hover:opacity-100"> {movieItem.genres.map((genre, index) => (
                                                <li className="cursor-pointer hover:text-[var(--accent-color)]"
                                                    key={nanoid()} onClick={(e) => {e.stopPropagation(); SearchByGenre(genre);}}>
                                                    {genre}{index < movieItem.genres.length - 1 ? ', ' : ''}
                                                </li>))}
                                            </ul>
                                        </div>
                                        {/* year,country,rating */}
                                        <div className="gap-3 flex flex-wrap items-center py-1.5 text-lg font-normal opacity-80" >
                                            <span>{movieItem.year}</span>
                                            <div className="size-1.5 bg-[var(--interactive-color)] rounded-full"></div>
                                            <span>{movieItem.country}</span>
                                            <div className="size-1.5 bg-[var(--interactive-color)] rounded-full"></div>
                                            <span className="flex items-center gap-1">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.774081 7.23333L2.85075 8.75L2.06208 11.1924C1.93463 11.5712 1.93302 11.9811 2.05748 12.3609C2.18194 12.7407 2.42582 13.0701 2.75275 13.3C3.07408 13.5373 3.46348 13.6644 3.86292 13.6624C4.26237 13.6604 4.65047 13.5294 4.96942 13.2889L7 11.7944L9.03117 13.2872C9.35191 13.5231 9.73921 13.6512 10.1374 13.6532C10.5356 13.6551 10.9241 13.5308 11.2471 13.298C11.5701 13.0652 11.811 12.7359 11.9352 12.3576C12.0593 11.9793 12.0603 11.5713 11.9379 11.1924L11.1492 8.75L13.2259 7.23333C13.5462 6.99913 13.7844 6.66969 13.9063 6.29206C14.0282 5.91443 14.0276 5.50794 13.9047 5.13064C13.7818 4.75334 13.5428 4.42454 13.2218 4.19119C12.9009 3.95785 12.5144 3.8319 12.1176 3.83133H9.56666L8.79258 1.41867C8.67085 1.03889 8.43165 0.70759 8.10948 0.472537C7.78731 0.237484 7.3988 0.110825 7 0.110825C6.60119 0.110825 6.21269 0.237484 5.89052 0.472537C5.56834 0.70759 5.32914 1.03889 5.20742 1.41867L4.43333 3.83133H1.88475C1.48793 3.8319 1.10144 3.95785 0.780486 4.19119C0.459529 4.42454 0.220522 4.75334 0.0976022 5.13064C-0.0253174 5.50794 -0.0258614 5.91443 0.0960478 6.29206C0.217957 6.66969 0.456084 6.99913 0.776415 7.23333H0.774081Z" fill="#F2C94C"/>
                                                </svg>{movieItem.imdb_rating}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                ))
                            }
                        </ul>
                </>)}
                {!loading && !error && moviesList.length === 0 && (<div className="flex flex-col font-bold items-center gap-5">
                    <svg  className="size-20 fill-[var(--accent-color)]" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 507 511.92">
                    <path d="M223.36 0c61.68 0 117.53 25 157.95 65.43 40.42 40.42 65.42 96.26 65.42 157.94 0 45.12-13.39 87.13-36.4 122.25L507 450.99l-66.66 60.93-93.23-102.58c-35.42 23.62-77.98 37.39-123.75 37.39-61.67 0-117.52-25-157.94-65.42C25 340.88 0 285.04 0 223.36c0-61.67 25-117.52 65.42-157.94S161.69 0 223.36 0zm59.55 136.89 25.81 25.99-59.78 60.5 59.83 60.56-25.9 25.79-59.48-60.19-59.57 60.3-25.8-25.99 59.77-60.51-59.83-60.56 25.9-25.79 59.48 60.19 59.57-60.29zm80.78-53.84c-35.91-35.91-85.53-58.13-140.33-58.13-54.8 0-104.41 22.22-140.32 58.13-35.91 35.91-58.12 85.51-58.12 140.31s22.21 104.42 58.12 140.32c35.91 35.92 85.52 58.12 140.32 58.12s104.42-22.2 140.33-58.12c35.91-35.9 58.11-85.51 58.11-140.32 0-54.8-22.2-104.4-58.11-140.31z"/>
                    </svg>
                    <p>No Results Found</p>
                </div>
                )}
            </InfiniteScroll>

        </div>
        </>
    )
}

export default List