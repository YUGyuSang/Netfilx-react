import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchuseYoutube=(id)=>{
      return api.get(`/movie/${id}/videos`)     
}

export const useYoutube = (id) =>{
     return useQuery({
        queryKey:['youtube',id],
        queryFn:()=>fetchuseYoutube(id)
    })
}