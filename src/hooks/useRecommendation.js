import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendation = (id) =>{
    return api.get(`/movie/${id}/recommendations`)
}

export const useRecommendation = (id) => {
    return useQuery({
        queryKey:['movie-Recommendation',id],
        queryFn:()=>fetchRecommendation(id)
    })
}