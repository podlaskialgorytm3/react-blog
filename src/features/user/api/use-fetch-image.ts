import { useQuery } from "@tanstack/react-query";
import { fetchProfileImage } from "./fetch-profile-image";

export const useFetchImage = (id: number) => {
    
   const fetchImageQuery = useQuery({
        queryFn: () => fetchProfileImage(id),
        refetchOnWindowFocus: false,
        queryKey: ["uploads"],
    });

    return fetchImageQuery;
}