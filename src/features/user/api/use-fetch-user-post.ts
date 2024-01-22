import { useQuery } from "@tanstack/react-query"
import { fetchUserPost } from "../api/fetch-user-post"

export const useFetchUserPost = (id: number) => (
    useQuery({
        queryKey: ["post"],
        queryFn: () => fetchUserPost(id)
    })
)