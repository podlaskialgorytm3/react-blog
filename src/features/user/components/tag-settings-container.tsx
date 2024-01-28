import { Link } from "react-router-dom"
import { useAuth } from "../../../shared/hooks/useAuth"
import { Loading } from "../../../shared/components/loading"
import { useFetchTagUser } from "../api/use-fetch-tag-user"
import { TagResponse } from "../types/tag-response"
import Swal from "sweetalert2"
import { TagSettingsCard } from "./tag-settings-card"
import { useDeleteTag } from "../api/use-delete-tag"
import { useState } from "react"

export const TagSettingsContainer = () => {
    const [deleteTagId, setDeleteTagId] = useState<number[]>([])

    const { userData } = useAuth();
    const { data, isLoading, isError, error } = useFetchTagUser(userData.user_id)
    const { mutate: deleteMutation } = useDeleteTag()

    const handleDelete = (tagId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this tag?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if(result.isConfirmed){
                deleteMutation(tagId)
                setDeleteTagId((prev) => [...prev, tagId])
            }
        })
    }

    if(isError){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        })
    }
    
    const updatedData = data?.filter((tag: TagResponse) => !deleteTagId.includes(tag.tag_id))

    return(
        <div className={`w-[500px] h-[auto] flex flex-col items-center relative`}>
                <h1 className="text-[36px] mb-5">Tag Settings 🔧🗂️</h1>
                <p className="text-lg">Go to <Link to="/user/post-settings" className="text-main font-bold">Post Settings</Link></p>
                {isLoading && <Loading size={100} />}
                {!isLoading && updatedData && updatedData.map((tag: TagResponse) => 
                <TagSettingsCard key={tag.tag_id} tag={tag} handleDelete={handleDelete}/>
                )}
         </div>
    )
}