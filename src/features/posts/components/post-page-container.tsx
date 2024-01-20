import { useParams } from "react-router-dom"
import { fetchPost } from "../../../api/fetch-post"
import { useQuery } from "@tanstack/react-query"
import { PostPage } from "./post-page"

export const PostPageContainer = () => {
    const { id } = useParams<{id: string}>();

    const { data: post } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(parseInt(id || ""))
    })

    return (
        <>
            {post && <PostPage post={post} />}
        </>
    )
}