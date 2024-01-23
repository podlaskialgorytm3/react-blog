import { useAuth } from "../../../shared/hooks/useAuth"
import { PostResponse } from "../../../shared/types/post-response"
import { PostSettingsCard } from "./post-settings-card"
import { Loading } from "../../../shared/components/loading"
import Swal from "sweetalert2"
import { useFetchUserPost } from "../api/use-fetch-user-post"
import { useDeletePost } from "../api/use-delete-post"
import { useState } from "react"

export const PostSettingsContainer = () => {
    const { userData } = useAuth();
    const { data, isLoading, isError, error } = useFetchUserPost(userData.user_id)
    const { mutate } = useDeletePost()
    const [deletePostId, setDeletePostId] = useState<number[]>([])

    if(isError){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        })
    }

    const handleDeletePost = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this post?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if(result.isConfirmed){
                mutate(id)
                setDeletePostId((prev) => [...prev, id])
            }
        })
    }

    const updatedData = data?.filter((post: PostResponse) => !deletePostId.includes(post.post_id))

    return(
        <div className={`w-[500px] h-[auto] flex flex-col items-center relative`}>
                <h1 className="text-[36px] mb-5">Post Settings 🔧🗂️</h1>
                {isLoading && <Loading size={100} />}
                {updatedData  && 
                updatedData .map((post: PostResponse) => (<PostSettingsCard key={post.post_id} post={post} handleDeletePost={handleDeletePost}/>))}
         </div>
    )
}