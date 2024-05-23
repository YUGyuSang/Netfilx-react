import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"
const fetchSerchMovie=({keyword,page})=>{
    return keyword?api.get(`/search/movie?query=${keyword}&page=${page}`):api.get(`/movie/popular?page=${page}`)
}

export const useSearchMovieQuery=({keyword,page})=>{
    return useQuery({
        queryKey:['movie-search',{keyword,page}],
        queryFn:()=>fetchSerchMovie({keyword,page}),
        select:(result)=>result.data
    })
}