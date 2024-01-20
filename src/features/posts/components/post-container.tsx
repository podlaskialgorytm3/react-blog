import { fetchPosts } from "../api/fetch-posts"
import { PostRequest } from "../types/post-content"
import { useQuery } from "@tanstack/react-query"

export const PostContainer = () => {
    const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })
    
    return (
        <div className="w-[1200px] flex flex-wrap">
            {data && data.map((post: PostRequest) => {console.log(post)})}
        </div>
    )
}