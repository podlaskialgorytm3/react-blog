import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../../../api/fetch-post";

export const useFetchPost = (id: string) => {
    
    return useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(parseInt(id || ""))
    })

}