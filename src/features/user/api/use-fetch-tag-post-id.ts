import { useQuery } from "@tanstack/react-query";

const fetchTagPostId = async (post_id: string) => {
    const response = await fetch(`http://localhost:3000/fetch-post-tag-id/${post_id}`);
    
    if(!response.ok){
        throw new Error("Something went wrong")
    }

    const  data  = await response.json();

    return data;
}

export const useFetchTagPostId = (post_id: string) => (
    useQuery({
        queryKey: ["post-tag-id", post_id],
        queryFn: () => fetchTagPostId(post_id),
        enabled: !!post_id
    })
)