import { PostRequest } from "../../../shared/types/post-request"
import { PostCard } from "./post-card"
import { Loading } from "../../../shared/components/loading"
import Swal from "sweetalert2"
import { useFetchPosts } from "../api/use-fetch-posts"

export const PostContainer = () => {
    const { data, isLoading, isError, error } = useFetchPosts()

    if(isError){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        })
    }
    
    return (
        <div className="w-[1200px] flex flex-wrap justify-center">
            {isLoading && <Loading  size={100}/>}
            {data && data.map((post: PostRequest) => <PostCard key={post.post_id} post={post} />)}
        </div>
    )
}