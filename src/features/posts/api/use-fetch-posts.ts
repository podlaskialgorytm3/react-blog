import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../api/fetch-posts"

export const useFetchPosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })
}