import { useQuery } from "@tanstack/react-query"
import { fetchUserPost } from "../api/fetch-user-post"
import { useAuth } from "../../../shared/hooks/useAuth"

export const PostSettingsPage = () => {
    const { userData } = useAuth();

    const { data } = useQuery({
        queryKey: ["post"],
        queryFn: () => fetchUserPost(userData.user_id)
    })

    return(
        <div className={`w-[500px] h-[auto] flex flex-col items-center relative`}>
                <h1 className="text-[36px]">Post Settings 🔧🗂️</h1>   
                {data && console.log(data)}
         </div>
    )
}