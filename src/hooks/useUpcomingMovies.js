import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies=()=>{
    return api.get(`/movie/upcoming`)
}

export const useUpcomingMovies=()=>{
    return useQuery({
        queryKey:["movie-UpcomingMovies"],
        queryFn:fetchUpcomingMovies,
        select:(result)=>result.data 
    })
}