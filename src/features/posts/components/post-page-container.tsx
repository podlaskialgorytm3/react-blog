import { useParams } from "react-router-dom"
import { fetchPost } from "../../../api/fetch-post"
import { useQuery } from "@tanstack/react-query"
import { PostPage } from "./post-page"

import { Loading } from "../../../shared/components/loading"
import Swal from "sweetalert2"

export const PostPageContainer = () => {
    const { id } = useParams<{id: string}>();

    const { data: post, isLoading, isError, error } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(parseInt(id || ""))
    })

    if(isError) {
        Swal.fire({
            title: "Error",
            text: error?.message,
            icon: "error",
            confirmButtonText: "Ok"
        })
    }

    return (
        <>
            {isLoading && <Loading size={100} />}
            {(!isLoading || post) && <PostPage post={post} />}
        </>
    )
}