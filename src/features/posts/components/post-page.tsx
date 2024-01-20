import { useParams } from "react-router-dom"
import { fetchPost } from "../../../api/fetch-post"
import { useQuery } from "@tanstack/react-query"

export const PostPage = () => {
    const { id } = useParams<{id: string}>();

    const { data: post } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(parseInt(id || ""))
    })

    return (
        <div>
            {post && console.log(post)}
        </div>
    )
}