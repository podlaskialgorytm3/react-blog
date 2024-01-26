import { Link } from "react-router-dom"
import { useAuth } from "../../../shared/hooks/useAuth"
import { Loading } from "../../../shared/components/loading"
import { useFetchTagUser } from "../api/use-fetch-tag-user"
import { TagResponse } from "../types/tag-response"
import Swal from "sweetalert2"
import { TagSettingsCard } from "./tag-settings-card"

export const TagSettingsContainer = () => {
    const { userData } = useAuth();
    const { data, isLoading, isError, error } = useFetchTagUser(userData.user_id)

    if(isError){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        })
    }

    return(
        <div className={`w-[500px] h-[auto] flex flex-col items-center relative`}>
                <h1 className="text-[36px] mb-5">Tag Settings 🔧🗂️</h1>
                <p className="text-lg">Go to <Link to="/user/post-settings" className="text-main font-bold">Post Settings</Link></p>
                {isLoading && <Loading size={100} />}
                {!isLoading && data && data.map((tag: TagResponse) => <TagSettingsCard key={tag.tag_id} {...tag} />)}
         </div>
    )
}