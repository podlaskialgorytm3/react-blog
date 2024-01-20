import { useQuery } from "@tanstack/react-query"
import { fetchUserPost } from "../api/fetch-user-post"
import { useAuth } from "../../../shared/hooks/useAuth"
import { PostRequest } from "../../../shared/types/post-request"
import { PostSettingsCard } from "./post-settings-card"

export const PostSettingsPage = () => {
    const { userData } = useAuth();

    const { data } = useQuery({
        queryKey: ["post"],
        queryFn: () => fetchUserPost(userData.user_id)
    })

    return(
        <div className={`w-[500px] h-[auto] flex flex-col items-center relative`}>
                <h1 className="text-[36px] mb-5">Post Settings 🔧🗂️</h1>   
                {data && data.map((post: PostRequest) => (<PostSettingsCard key={post.post_id} post={post} />))}
         </div>
    )
}