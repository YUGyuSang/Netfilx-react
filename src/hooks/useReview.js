import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchReview = (id)=>{
    return api.get(`/movie/${id}/reviews`)
}

export const useReview = (id)=>{
    return useQuery({
        queryKey:['Review',id],
        queryFn:()=>fetchReview(id)
    })
}