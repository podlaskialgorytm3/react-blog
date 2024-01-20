import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../api/fetch-posts"

export const useFetchPosts = () => {
    const fetchPostQuery =  useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })

    return fetchPostQuery
}