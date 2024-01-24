import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../api/fetch-posts"

export const useFetchPosts = (page: number) => {
    return useQuery({
        queryKey: ["posts",page],
        queryFn: () => fetchPosts(page),
    })
}