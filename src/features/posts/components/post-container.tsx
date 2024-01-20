import { fetchPosts } from "../api/fetch-posts"
import { PostRequest } from "../types/post-content"
import { useQuery } from "@tanstack/react-query"

import { PostCard } from "./post-card"

export const PostContainer = () => {
    const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })
    
    return (
        <div className="w-[1200px] flex flex-wrap justify-center">
            {data && data.map((post: PostRequest) => <PostCard key={post.post_id} post={post} />)}
        </div>
    )
}