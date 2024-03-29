import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../../api/fetch-posts"

export const useFetchPosts = (page: number,postCountOnPage: number) => {
    return useQuery({
        queryKey: ["posts",page,postCountOnPage],
        queryFn: () => fetchPosts(page,postCountOnPage),
    })
}