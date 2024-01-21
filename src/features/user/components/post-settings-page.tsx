import { useAuth } from "../../../shared/hooks/useAuth"
import { PostRequest } from "../../../shared/types/post-request"
import { PostSettingsCard } from "./post-settings-card"
import { Loading } from "../../../shared/components/loading"
import Swal from "sweetalert2"
import { useFetchUserPost } from "../api/use-fetch-user-post"
import { useDeletePost } from "../api/use-delete-post"

export const PostSettingsPage = () => {
    const { userData } = useAuth();
    const { data, isLoading, isError, error } = useFetchUserPost(userData.user_id)
    const { mutate } = useDeletePost()
    if(isError){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        })
    }

    const handleDeletePost = (id: number) => {
        mutate(id)
    }

    return(
        <div className={`w-[500px] h-[auto] flex flex-col items-center relative`}>
                <h1 className="text-[36px] mb-5">Post Settings 🔧🗂️</h1>
                {isLoading && <Loading size={100} />}
                {data && 
                data.map((post: PostRequest) => (<PostSettingsCard key={post.post_id} post={post} handleDeletePost={handleDeletePost}/>))}
         </div>
    )
}