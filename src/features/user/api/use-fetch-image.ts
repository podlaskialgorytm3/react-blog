import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "../api/fetch-image";

export const useFetchImage = (id: number) => {
    
   const fetchImageQuery = useQuery({
        queryFn: () => fetchImage(id),
        refetchOnWindowFocus: false,
        queryKey: ["uploads"],
    });

    return fetchImageQuery;
}