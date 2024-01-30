import { useQuery } from "@tanstack/react-query";
import { URL } from "../../../shared/config/confidential-data";

const fetchTagPostId = async (post_id: string) => {
    const response = await fetch(`${URL}/post/tags/id/${post_id}`);
    
    if(!response.ok){
        throw new Error("Something went wrong")
    }

    const  data  = await response.json();

    return data;
}

export const useFetchTagPostId = (post_id: string) => (
    useQuery({
        queryKey: ["tags", post_id],
        queryFn: () => fetchTagPostId(post_id),
        enabled: !!post_id
    })
)