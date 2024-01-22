import { useParams } from "react-router-dom"
import { PostPage } from "./post-page"
import { Loading } from "../../../shared/components/loading"
import Swal from "sweetalert2"
import { useFetchPost } from "../api/use-fetch-post"

export const PostPageContainer = () => {
    const { id } = useParams<{id: string}>();

    const { data: post, isLoading, isError, error } = useFetchPost(id || "")

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