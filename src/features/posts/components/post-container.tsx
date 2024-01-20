import { fetchPosts } from "../api/fetch-posts"
import { PostRequest } from "../types/post-content"
import { useQuery } from "@tanstack/react-query"

import { PostCard } from "./post-card"

import { Loading } from "../../../shared/components/loading"

import Swal from "sweetalert2"

export const PostContainer = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })

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